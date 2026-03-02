# agents/models.py
from django.db import models
import uuid

class Agent(models.Model):
    STATUS_CHOICES = [('idle','Idle'),('running','Running'),('done','Done'),('failed','Failed')]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    agent_type = models.CharField(max_length=50)  # 'qualifier'
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='idle')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class AgentRun(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='runs')
    lead_data = models.JSONField()           # Input lead info
    result = models.JSONField(null=True)     # Qualification result
    tokens_used = models.IntegerField(default=0)
    cost_usd = models.FloatField(default=0.0)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True)
    status = models.CharField(max_length=20, default='pending')

class AgentLog(models.Model):
    run = models.ForeignKey(AgentRun, on_delete=models.CASCADE, related_name='logs')
    level = models.CharField(max_length=10, default='INFO')  # INFO, WARN, ERROR
    message = models.TextField()
    step = models.CharField(max_length=100, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(null=True, blank=True)