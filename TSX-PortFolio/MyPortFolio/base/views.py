from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'base/index.html')

def index_1_view(request):
    return render(request, 'base/index-1.html')

def index_2_view(request):
    return render(request, 'base/index-2.html')