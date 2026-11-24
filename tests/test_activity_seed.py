import ast
import unittest
from pathlib import Path

class ActivitySeedTests(unittest.TestCase):
    def test_manga_seed(self):
        tree = ast.parse(Path("src/backend/database.py").read_text())
        seed = next(n.value for n in tree.body if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == "initial_activities" for t in n.targets))
        data = ast.literal_eval(seed)
        club = data["Manga Maniacs"]
        self.assertEqual(club["schedule_details"]["days"], ["Tuesday"])
        self.assertEqual(club["schedule_details"]["start_time"], "19:00")
        self.assertEqual(club["max_participants"], 15)
        self.assertEqual(club["schedule"], "Tuesdays, 7:00 PM - 8:00 PM")
        self.assertIn("manga", club["description"].lower())
        self.assertEqual(club["participants"], [])
        self.assertTrue(club["description"].strip())
        self.assertGreater(club["schedule_details"]["end_time"], club["schedule_details"]["start_time"])
