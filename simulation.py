"""Deterministic scenarios for demonstrations; not patient measurements."""
from .engine import Reading
SCENARIOS = {
 'Expected tag, scheduled, movement': Reading('MED-A', 'MED-A', 0.40, True),
 'Unexpected RFID tag': Reading('MED-A', 'MED-B', 0.50, True),
 'Motion outside schedule': Reading('MED-A', 'MED-A', 0.60, False),
 'Movement without detected tag': Reading('MED-A', '', 0.50, True),
 'No movement': Reading('MED-A', 'MED-A', 0.08, True),
}
