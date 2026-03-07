from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("scout", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="QualifiedLead",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("business_size_score", models.FloatField(default=0)),
                ("location_score", models.FloatField(default=0)),
                ("industry_score", models.FloatField(default=0)),
                ("phone_score", models.FloatField(default=0)),
                ("online_presence_score", models.FloatField(default=0)),
                ("final_score", models.FloatField(default=0)),
                ("qualified", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "lead",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="qualification",
                        to="scout.lead",
                    ),
                ),
            ],
        ),
    ]