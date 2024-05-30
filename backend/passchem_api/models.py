# models.py

from django.conf import settings
from django.db import models

class Unit(models.Model):
    title = models.CharField(max_length=255)
    img = models.ImageField(upload_to='unit_images', null=True, blank=True)
    unit_number = models.IntegerField()

    def __str__(self):
        return self.title

class Topic(models.Model):
    unit = models.ForeignKey(Unit, related_name='units', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    topic_number = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.title

class Lesson(models.Model):
    LESSON_TYPES = [
        ('video', 'Video'),
        ('text', 'Text'),
    ]

    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, null=True, blank=True)
    topic = models.ForeignKey(Topic, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    lesson_number = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=5, choices=LESSON_TYPES)

    video_title = models.CharField(blank=True, null=True, max_length=255)
    notes = models.FileField(upload_to='documents/notes', blank=True, null=True)
    worksheet = models.FileField(upload_to='documents/worksheets', blank=True, null=True)
    answer_key = models.FileField(upload_to='documents/answer_keys', blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.type == 'video':
            self.worksheet = None
            self.answer_key = None
            self.notes = None
        if self.type == 'text':
            self.video_title = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class VideoSetting(models.Model):
    video = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    language = models.CharField(max_length=255)
    language_number = models.IntegerField(blank=True, null=True)
    url_id = models.CharField(max_length=255)
    
    def lesson_str(self):
        return self.video.video_title 
    
    def __str__(self):
        return f"{self.lesson_str()} - {self.language}"

class UserUnit(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    unit = models.ForeignKey(Unit, related_name='user_units', on_delete=models.CASCADE)
    progression = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('user', 'unit')

    def update_progression(self):
        total_lessons = Lesson.objects.filter(unit=self.unit).count()
        if total_lessons > 0:
            completed_lessons = UserLesson.objects.filter(user=self.user, lesson__unit=self.unit, completed=True).count()
            self.progression = (completed_lessons / total_lessons) * 100
        else:
            self.progression = 0
        self.save()

    def __str__(self):
        return f"{self.user.username} - {self.unit.title}"

class UserTopic(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, related_name='user_topics', on_delete=models.CASCADE)
    progression = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('user', 'topic')

    def update_progression(self):
        total_lessons = self.topic.lessons.count()
        if total_lessons > 0:
            completed_lessons = UserLesson.objects.filter(user=self.user, lesson__topic=self.topic, completed=True).count()
            self.progression = (completed_lessons / total_lessons) * 100
        else:
            self.progression = 0
        self.save()
        user_unit = self.get_user_unit()
        if user_unit:
            user_unit.update_progression()

    def __str__(self):
        return f"{self.user.username} - {self.topic.title}"

    def get_user_unit(self):
        user_unit, created = UserUnit.objects.get_or_create(user=self.user, unit=self.topic.unit)
        return user_unit


class UserLesson(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='user_lessons', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'lesson')

    def __str__(self):
        return f"{self.user.email} - {self.lesson.title} - {self.completed}"

    def get_user_topic(self):
        user_topic, created = UserTopic.objects.get_or_create(user=self.user, topic=self.lesson.topic)
        return user_topic

