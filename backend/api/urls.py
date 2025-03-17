from django.urls import path
from . import views

urlpatterns = [
    path("notes/",views.NotesListCreate.as_view(),name="notes-list"),
    path("notes/delete/<int:pk>/",views.NotesDelete.as_view(),name="delet-notes")    
]
