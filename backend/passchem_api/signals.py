from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserLesson

@receiver(post_save, sender=UserLesson)
def update_topic_and_unit_progression(sender, instance, **kwargs):
    user_topic = instance.get_user_topic()
    user_topic.update_progression()