from django.db import models
from django.contrib.auth.models import User 
# Create your models here.

class Notes(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.ForeignKey(User,on_delete=models.CASCADE,related_name="notes")

    def __str__(self):
        return self.title
