from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth import get_user_model
from .models import Unit, Topic, Lesson, UserUnit, UserTopic, UserLesson

User = get_user_model()

@receiver(post_save, sender=Unit)
def create_user_units_for_new_unit(sender, instance, created, **kwargs):
    if created:
        users = User.objects.all()
        for user in users:
            UserUnit.objects.get_or_create(user=user, unit=instance)

@receiver(post_save, sender=Topic)
def create_user_topics_for_new_topic(sender, instance, created, **kwargs):
    if created:
        users = User.objects.all()
        for user in users:
            UserUnit.objects.get_or_create(user=user, unit=instance.unit)
            UserTopic.objects.get_or_create(user=user, topic=instance)

@receiver(post_save, sender=Lesson)
def create_user_lessons_for_new_lesson(sender, instance, created, **kwargs):
    if created:
        users = User.objects.all()
        for user in users:
            UserLesson.objects.get_or_create(user=user, lesson=instance)

@receiver(post_save, sender=UserLesson)
def update_topic_and_unit_progression(sender, instance, created, **kwargs):
    if created or instance.completed:
        user_topic = instance.get_user_topic()
        if user_topic:
            user_topic.update_progression()
        
        user_unit = user_topic.get_user_unit() if user_topic else None
        if user_unit:
            user_unit.update_progression()