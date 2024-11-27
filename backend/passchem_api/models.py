from django.conf import settings
from django.db import models

class Unit(models.Model):
    """
    Represents the units in the PassChem curriculum.

    Fields:
        title (CharField): The title of the unit.
        img (ImageField): The image on the unit card.
        unit_number (IntegerField): The number of the unit to determine order.

    Methods:
        __str__: 
            Returns the title of the unit as its string representation.
    """
    title = models.CharField(max_length=255)
    img = models.ImageField(upload_to='unit_images', null=True, blank=True)
    unit_number = models.IntegerField()

    def __str__(self):
        """
        Returns the string representation of the unit. In this case, it is the title
        of the unit.
        """
        return self.title

class Topic(models.Model):
    """
    Represents the different possible topics associated with a specific unit of the 
    PassChem curriculum.

    Fields:
        unit (ForeignKey): A foreign key relationship with unit. Every topic must
                           have an associated unit.
        title (CharField): The title of the topic.
        description (CharField): The description of said topic.
        topic_number (IntegerField): The number of the topic to determine order.

    Methods:
        __str__: 
            Returns the title of the topic as its string representation.
    """
    unit = models.ForeignKey(Unit, related_name='topics', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    topic_number = models.IntegerField(blank=True, null=True)

    def __str__(self):
        """
        Returns the string representation of the topic. In this case, it is the title
        of the topic.
        """
        return self.title

class Lesson(models.Model):
    """
    Represents the different lessons associated with a specific unit and topic. Lessons can be
    either videos or text-based, which include worksheets, answer sheets, and notes.

    Fields:
        LESSON_TYPES (list): The possible types of lessons ('video' or 'text').

        unit (ForeignKey): A foreign key relationship to the Unit model. This is optional,
                           meaning a lesson can exist without being directly tied to a unit.
        topic (ForeignKey): A foreign key relationship to the Topic model. This is required
                            and uses the related name 'topics' for reverse lookups.
        title (CharField): A required char field which represents the title of the lesson.
        lesson_number (IntegerField): An required IntegerField to represent the lesson's order within the topic.
        type (CharField): A required field that specifies the type of lesson. Choices were created in LESSON_TYPES.
        

        video_title (CharField): An optional field that represents the title of the video, if the lesson 
                                 type is 'video'.
        notes (FileField): An optional field for uploading notes associated with the lesson.
        worksheet (FileField): An optional field for uploading a worksheet related to the lesson.
        answer_key (FileField): An optional field for uploading the answer key corresponding to the worksheet.

    Methods:
        save: 
            Overrides the default save method to ensure that specific fields are nullified based
            on the lesson type. If the lesson is a video, the worksheet, notes, and answer key fields 
            are set to null. If the lesson is text-based, the video title field is set to null.

        __str__:
            Returns the title of the lesson as its string representation.
    """
    LESSON_TYPES = [
        ('video', 'Video'),
        ('text', 'Text'),
    ]

    unit = models.ForeignKey(Unit, related_name='lessons', on_delete=models.CASCADE, null=True)
    topic = models.ForeignKey(Topic, related_name='lessons', on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=255)
    lesson_number = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=5, choices=LESSON_TYPES)

    video_title = models.CharField(blank=True, null=True, max_length=255)
    notes = models.FileField(upload_to='documents/notes', blank=True, null=True)
    worksheet = models.FileField(upload_to='documents/worksheets', blank=True, null=True)
    answer_key = models.FileField(upload_to='documents/answer_keys', blank=True, null=True)

    def save(self, *args, **kwargs):
        """
        Custom save method to handle the nullification of certain fields based on the lesson type.
        - If the lesson type is 'video', the fields for worksheet, notes, and answer key are set to null.
        - If the lesson type is 'text', the video title field is set to null.
        """
        if self.type == 'video':
            self.worksheet = None
            self.answer_key = None
            self.notes = None
        if self.type == 'text':
            self.video_title = None
        super().save(*args, **kwargs)

    def __str__(self):
        """
        Returns the string representation of the topic. In this case, it is the title
        of the lesson.
        """
        return self.title

class VideoSetting(models.Model):
    """
    Represents the video settings if the video type of lesson is selected. The settings
    for this video include the language, language_number, and url_id.

    Fields:
        video (ForeignKey): A foreign key relationship to the Lesson model.
        language (CharField): A required char field to display the language of the video.
        language_number (IntegerField): A required integer field to determing the order of
                                        the languages.
        url_id (CharField): A required char field where the url of the video will be stored.

    Methods:
        lesson_str: 
            Returns the title of the video associated with this VideoSetting instance.
        
        __str__: 
            Returns a string representation of the VideoSetting instance, showing the 
            video title and language.
    """
    video = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    language = models.CharField(max_length=255)
    language_number = models.IntegerField(blank=True, null=True)
    url_id = models.CharField(max_length=255)
    
    def lesson_str(self):
        """
        Returns the title of the associated video lesson.
        """
        return self.video.video_title 
    
    def __str__(self):
        """
        Returns a formatted string combining the video title and language.
        For example, 'Acid Base Theory Introduction - English'.
        """
        return f"{self.lesson_str()} - {self.language}"

class UserUnit(models.Model):
    """
    Represents a user's progress in a specific unit, tracking progression as a percentage 
    of completed lessons.

    Fields:
        user (ForeignKey): A foreign key to the User model (from settings.AUTH_USER_MODEL). 
                           Links the UserUnit instance to a specific user.
        unit (ForeignKey): A foreign key to the Unit model, indicating which unit this 
                           progress relates to. Uses 'user_units' as the related name for 
                           reverse lookups.
        progression (FloatField): A float value representing the user's progression through 
                                  the unit as a percentage.

    Meta:
        unique_together: Ensures that each user-unit combination is unique. This means a 
                         user can have only one UserUnit record per unit.

    Methods:
        update_progression:
            Calculates and updates the user's progression through the unit. It first 
            counts all lessons in the unit and then counts only those marked as completed 
            for the user. Progression is set as a percentage of completed lessons to 
            total lessons. If there are no lessons, progression defaults to 0.
        
        __str__:
            Returns a string representation of the UserUnit instance, combining the 
            username and unit title.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    unit = models.ForeignKey(Unit, related_name='user_units', on_delete=models.CASCADE)
    progression = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('user', 'unit')

    def update_progression(self):
        """
        Calculates and updates the progression field based on the number of completed 
        lessons in the unit. Uses UserLesson to count lessons marked as completed by the user.
        - If there are lessons in the unit, progression is calculated as the percentage 
        of completed lessons.
        - If no lessons exist in the unit, progression is set to 0.
        """
        total_lessons = Lesson.objects.filter(unit=self.unit).count()
        if total_lessons > 0:
            completed_lessons = UserLesson.objects.filter(
                user=self.user, lesson__unit=self.unit, completed=True
            ).count()
            self.progression = (completed_lessons / total_lessons) * 100
        else:
            self.progression = 0
        self.save()

    def __str__(self):
        """
        Returns a string representation of the user's progress in the unit.
        """
        return f"{self.user.username} - {self.unit.title}"

class UserTopic(models.Model):
    """
    Represents a user's progress in a specific topic, tracking progression as a percentage
    of completed lessons within the topic.

    Fields:
        user (ForeignKey): A foreign key to the User model (from settings.AUTH_USER_MODEL).
                           Links the UserTopic instance to a specific user, with CASCADE
                           delete behavior.
        topic (ForeignKey): A foreign key to the Topic model, indicating the topic this 
                            progress relates to. Uses 'user_topics' as the related name for 
                            reverse lookups.
        progression (FloatField): A float value (default 0.0) representing the user's 
                                  progression through the topic as a percentage (0 to 100).

    Meta:
        unique_together: Ensures that each user-topic combination is unique. This means a 
                         user can have only one UserTopic record per topic.

    Methods:
        update_progression:
            Calculates and updates the user's progression through the topic. First, it 
            counts all lessons within the topic and then counts only those marked as 
            completed by the user. Progression is set as a percentage of completed 
            lessons to total lessons. If there are no lessons, progression defaults to 0.
            Also updates the associated UserUnit's progression if it exists.

        __str__:
            Returns a string representation of the UserTopic instance, combining the 
            username and topic title for readability. Example: "john_doe - Topic A"
        
        get_user_unit:
            Retrieves or creates the UserUnit instance associated with the user's
            unit that contains this topic, to ensure consistency between topic and 
            unit progress tracking.
    """
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, related_name='user_topics', on_delete=models.CASCADE)
    progression = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('user', 'topic')

    def update_progression(self):
        """
        Calculates and updates the progression field based on the number of completed 
        lessons in the topic. Progression is updated as a percentage of completed 
        lessons. If no lessons exist in the topic, progression is set to 0.
        Also triggers an update to the associated UserUnit's progression.
        """
        total_lessons = self.topic.lessons.count() if self.topic else 0
        if total_lessons > 0:
            completed_lessons = UserLesson.objects.filter(
                user=self.user, lesson__topic=self.topic, completed=True
            ).count()
            self.progression = (completed_lessons / total_lessons) * 100
        else:
            self.progression = 0
        self.save()

        user_unit = self.get_user_unit()
        if user_unit:
            user_unit.update_progression()

    def __str__(self):
        """
        Returns a string representation of the user's progress in the topic,
        formatted as "username - topic title".
        """
        return f"{self.user.username} - {self.topic.title}"

    def get_user_unit(self):
        """
        Retrieves or creates the UserUnit instance associated with the user's unit 
        that contains this topic, ensuring accurate tracking between related topic 
        and unit progression.
        """
        user_unit = UserUnit.objects.get(user=self.user, unit=self.topic.unit)
        return user_unit


class UserLesson(models.Model):
    """
    Represents a user's completion status for a specific lesson.

    Fields:
        user (ForeignKey): A foreign key to the User model (from settings.AUTH_USER_MODEL).
                           Links the UserLesson instance to a specific user, with CASCADE
                           delete behavior.
        lesson (ForeignKey): A foreign key to the Lesson model, indicating the lesson this 
                             completion status relates to. Uses 'user_lessons' as the 
                             related name for reverse lookups.
        completed (BooleanField): A boolean field that tracks whether the user has completed 
                                  the lesson. Default is False.

    Meta:
        unique_together: Ensures that each user-lesson combination is unique. This means a 
                         user can have only one UserLesson record per lesson.

    Methods:
        __str__:
            Returns a string representation of the UserLesson instance, combining the 
            user email, lesson title, and completion status for readability.
            Example: "john_doe@example.com - Lesson 1 - True"
        
        get_user_topic:
            Retrieves or creates the UserTopic instance associated with the user's
            topic that contains this lesson, to ensure consistency between lesson and 
            topic completion tracking.
    """
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='user_lessons', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'lesson')

    def __str__(self):
        """
        Returns a string representation of the UserLesson instance, formatted as 
        "user email - lesson title - completed status".
        """
        return f"{self.user.email} - {self.lesson.title} - {self.completed}"

    def get_user_topic(self):
        """
        Retrieves or creates the UserTopic instance associated with the user's topic 
        that contains this lesson. Returns None if the lesson has no topic.
        """
        if self.lesson.topic:
            return UserTopic.objects.get(user=self.user, topic=self.lesson.topic)
        return None 
