from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the custom User model. Handles serialization and deserialization
    of User instances, including creating and updating users with password hashing.

    Meta:
        model (User): Specifies the custom User model as the target model.
        fields (str): Includes all fields from the User model in the serialized output.
        extra_kwargs (dict): Ensures the password field is write-only, meaning it will 
                             not be included in read operations.

    Methods:
        create: Custom create method that uses the `create_user` method from UserManager 
                to handle password hashing when a new user is created.
        update: Custom update method that checks for a new password in the validated data.
                If provided, the password is hashed before saving the updated instance.
    """

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        """
        Creates a new User instance with the validated data.
        
        Uses the UserManager's `create_user` method to ensure the password is hashed.
        
        Parameters:
            validated_data (dict): The validated data for creating the user.
        
        Returns:
            User: The newly created user instance.
        """
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """
        Updates an existing User instance with the validated data.
        
        Checks if a new password is provided. If so, it hashes the password 
        before saving. Other fields are updated directly.
        
        Parameters:
            instance (User): The existing user instance to update.
            validated_data (dict): The validated data for updating the user.
        
        Returns:
            User: The updated user instance.
        """
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)  # Hashes and sets the new password
        for attr, value in validated_data.items():
            setattr(instance, attr, value)  # Updates other fields
        instance.save()
        return instance