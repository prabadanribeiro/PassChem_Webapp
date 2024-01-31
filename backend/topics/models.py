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

    video_url = models.URLField(blank=True, null=True)
    documents = models.CharField(max_length=255, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.type == 'video':
            self.documents = None
        if self.type == 'text':
            self.video_url = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
