from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password, check_password

class UserManager(BaseUserManager):
    """
    Custom manager for the User model to handle user creation with email and optional 
    Google ID. Provides methods for creating regular users and superusers with 
    specific configurations.
    """

    def _create_user(self, email, password=None, google_id=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        
        Parameters:
            email (str): The user's email, used as the unique identifier.
            password (str, optional): The user's password.
            google_id (str, optional): The user's Google ID, if registering via Google.
            extra_fields (dict): Additional fields to set on the user model.
        
        Returns:
            User: The created user instance.
        
        Raises:
            ValueError: If email is not provided.
        """
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        user = self.model(email=email, google_id=google_id, **extra_fields)
        
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, google_id=None, **extra_fields):
        """
        Creates a regular user with the provided email, password, and optional Google ID.
        
        Returns:
            User: The created user instance with is_staff and is_superuser set to False.
        """
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, google_id, **extra_fields)

    def create_superuser(self, email, password=None, google_id=None, **extra_fields):
        """
        Creates a superuser with the provided email, password, and optional Google ID.
        
        Ensures the user has is_staff and is_superuser set to True.
        
        Returns:
            User: The created superuser instance.
        
        Raises:
            ValueError: If is_staff or is_superuser is not set to True.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(email, password, google_id, **extra_fields)


class User(AbstractUser):
    """
    Custom user model that uses email as the unique identifier instead of a username.
    Supports optional Google ID for Google login integration.
    
    Fields:
        first_name (CharField): User's first name.
        last_name (CharField): User's last name.
        email (CharField): Unique email field used as the primary identifier.
        password (CharField): User's password.
        google_id (CharField): Optional Google ID field for users registered via Google.
    
    Meta:
        username: Removed from the model to use email as the unique identifier.
        USERNAME_FIELD: Set to email for authentication.
        REQUIRED_FIELDS: No additional fields required on creation.
    
    Methods:
        __str__: Returns the user's email as the string representation.
    """

    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    email = models.CharField(max_length=250, unique=True)
    password = models.CharField(max_length=250)
    google_id = models.CharField(max_length=255, blank=True, null=True)

    # Remove username field and use email as the unique identifier
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # Assign custom manager to User model
    objects = UserManager()

    def __str__(self):
        """
        Returns the email of the user as the string representation.
        """
        return self.email or ""


class AlternateEmail(models.Model):
    """
    Model for storing additional email addresses for a user with separate passwords.
    Useful for users with multiple emails and allows setting and verifying passwords.

    Fields:
        user (ForeignKey): ForeignKey linking the alternate email to the main User.
        email (EmailField): Unique email address associated with the alternate email.
        password (CharField): Password for this alternate email, stored as a hashed value.

    Methods:
        set_password: Hashes and sets the password for the alternate email.
        check_password: Checks if a given password matches the hashed password.
        __str__: Returns the alternate email as the string representation.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='alternate_emails')
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def set_password(self, raw_password):
        """
        Hashes the raw password and sets it as the password for this alternate email.
        
        Parameters:
            raw_password (str): Plain text password to hash and store.
        """
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """
        Checks if the provided plain text password matches the stored hashed password.
        
        Parameters:
            raw_password (str): Plain text password to check.
        
        Returns:
            bool: True if the password matches, False otherwise.
        """
        return check_password(raw_password, self.password)

    def __str__(self):
        """
        Returns the alternate email as the string representation.
        """
        return self.email
