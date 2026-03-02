# agents/serializers.py
from rest_framework import serializers
from .models import Agent, AgentRun, AgentLog

class AgentLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentLog
        fields = ['id','level','step','message','timestamp','metadata']

class AgentRunSerializer(serializers.ModelSerializer):
    logs = AgentLogSerializer(many=True, read_only=True)
    class Meta:
        model = AgentRun
        fields = ['id','status','lead_data','result','tokens_used','cost_usd',
                  'started_at','completed_at','logs']