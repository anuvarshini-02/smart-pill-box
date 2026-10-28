import unittest
from pillbox.engine import Reading,evaluate

class EngineTests(unittest.TestCase):
    def test_matching_tag_in_window(self):
        self.assertFalse(evaluate(Reading('A','A',.5,True))['potential_error'])
    def test_wrong_tag_alerts(self):
        self.assertTrue(evaluate(Reading('A','B',.5,True))['potential_error'])
    def test_outside_schedule_alerts(self):
        self.assertTrue(evaluate(Reading('A','A',.5,False))['potential_error'])
    def test_motion_without_tag_alerts(self):
        self.assertTrue(evaluate(Reading('A','',.5,True))['potential_error'])
    def test_stationary_no_tag_does_not_claim_consumption(self):
        self.assertFalse(evaluate(Reading('A','',.1,True))['potential_error'])
    def test_invalid_acceleration(self):
        with self.assertRaises(ValueError):evaluate(Reading('A','A',-1,True))
if __name__=='__main__':unittest.main()
