from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator



# Create your models here.


class DogSize(models.Model):
    id = models.AutoField(primary_key = True)
    size = models.CharField(max_length=8)
    walker = models.ForeignKey('Walkers', on_delete = models.CASCADE)
    def __str__ (self):
        return self.size

class Schedules(models.Model):
    id = models.AutoField(primary_key = True)
    day_of_week = models.CharField(max_length=10, default='Monday',
        choices=(('monday', 'Monday'),
            ('tuesday', 'Tuesday'),
            ('wednesday', 'Wednesday'),
            ('thursday', 'Thursday'),
            ('friday', 'Friday'),
            ('saturday', 'Saturday'),
            ('sunday', 'Sunday')))
    hour = models.PositiveSmallIntegerField(validators=[MinValueValidator(7), MaxValueValidator(20)])
    walker = models.ForeignKey('Walkers', null=True, blank=True, on_delete=models.SET_NULL)
    def __str__(self):
        return "{} {}".format(self.day_of_week, self.hour)

        
class Users(models.Model):
    password = models.CharField( max_length = 256, blank= True)
    name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    email = models.CharField(primary_key = True,max_length = 100)
    phone = models.CharField(max_length = 50)
    adress = models.CharField(max_length = 50)
    def __str__(self):
        return self.name


class Dogs(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length=50)
    breed = models.CharField(max_length = 40)
    age = models.IntegerField()
    size = models.CharField(max_length = 10)
    owner = models.ForeignKey('Users', on_delete=models.CASCADE)
    walker = models.ForeignKey('Walkers', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__ (self):
        return self.name


class Walkers(models.Model):
    password = models.CharField(max_length = 256 ,blank= True)
    name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    email = models.CharField(primary_key = True,max_length = 100)
    phone = models.CharField(max_length = 50)
    adress = models.CharField(max_length = 50)
    avalible = models.BooleanField()
    
    def __str__(self):
        return self.name

class ScheduledWalks(models.Model):
    id = models.AutoField(primary_key = True)
    day_of_week = models.CharField(max_length=10, default='Monday',
        choices=(('monday', 'Monday'),
            ('tuesday', 'Tuesday'),
            ('wednesday', 'Wednesday'),
            ('thursday', 'Thursday'),
            ('friday', 'Friday'),
            ('saturday', 'Saturday'),
            ('sunday', 'Sunday')))
    hour = models.PositiveSmallIntegerField(validators=[MinValueValidator(7), MaxValueValidator(20)], blank= True, null = True)
    dog = models.ForeignKey('Dogs', on_delete = models.CASCADE)
    walker = models.ForeignKey('Walkers', on_delete = models.CASCADE)
    def __str__(self):
        return "{} {}".format(self.day_of_week, self.hour)