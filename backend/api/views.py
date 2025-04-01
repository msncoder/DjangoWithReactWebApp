from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .models import Notes
from .serializer import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.

class NotesListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author = user)
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.error)

class NotesDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author = user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# from rest_framework import generics
# from django.contrib.auth.models import User
# from rest_framework.response import Response
# from rest_framework import status
# from api.serializer import UserSerializer
# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
