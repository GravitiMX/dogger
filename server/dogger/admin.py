from django.contrib import admin

# Register your models here.
from dogger.models import *

class AdminUsers(admin.ModelAdmin):
  list_display = ["email", "__str__"]
  list_filter = ["email", "name", "last_name"]
  search_fields = ["email", "name", "last_name"]
  class Meta:
      meta = Users

class AdminDogs(admin.ModelAdmin):
  list_display = ["name", "size", "walker"]
  list_filter = ["name", "size", "walker"]
  search_fields = ["name", "size","walker"]
  class Meta:
      meta = Dogs

class AdminDogSize(admin.ModelAdmin):
  list_display = ["size"]
  list_filter = ['size']
  search_fields = ["size"]

class AdminScheduledWalks(admin.ModelAdmin):
  list_display = ["__str__", "dog"]
  list_filter = ["day_of_week", "hour", "dog"]
  search_fields = ["day_of_week", "hour", "dog"]
  class Meta:
      meta = ScheduledWalks

class AdminSchedule(admin.ModelAdmin):
  list_display = ["__str__"]
  list_filter = ["day_of_week", "hour"]
  search_fields = ["day_of_week", "hour"]
  class Meta:
      meta = Schedules

class AdminWalkers(admin.ModelAdmin):
  list_display = ["email", "__str__"]
  list_filter = ["email", "name", "last_name"]
  search_fields = ["email", "name", "last_name"]

  class Meta:
    meta = Walkers

admin.site.register(Users, AdminUsers)
admin.site.register(Dogs, AdminDogs)
admin.site.register(DogSize)
admin.site.register(Schedules, AdminSchedule)
admin.site.register(ScheduledWalks, AdminScheduledWalks)
admin.site.register(Walkers, AdminWalkers)