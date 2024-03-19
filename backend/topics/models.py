from django.db import models

# Create your models here.
class Topics(models.Model):
    title = models.CharField(max_length=255)
    img = models.ImageField(upload_to='topics_images', height_field=None, width_field=None, null=True)
    unit = models.IntegerField()

    def __str__(self):
        return self.title

class Lesson(models.Model):
    
    LESSON_TYPES = [
        ('video', 'Video'),
        ('text', 'Text'),
    ]

    topic = models.ForeignKey(Topics, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=5, choices=LESSON_TYPES)

    video_title = models.CharField(blank=True, null=True, max_length=255)
    document = models.FileField(upload_to='documents/worksheets', blank=True, null=True)
    answer_key = models.FileField(upload_to='documents/answer_keys', blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.type == 'video':
            self.documents = None
            self.answer_key = None
        if self.type == 'text':
            self.video_title = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class VideoLanguage(models.Model):
    video = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    language = models.CharField(max_length=255)
    url_id = models.CharField(max_length=255)
    
    def lesson_str(self):
        return self.video.video_title 
    
    def __str__(self):
        return f"{self.lesson_str()} - {self.language}"