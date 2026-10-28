"""Streamlit demonstration UI; no real sensor connection or clinical use."""
import streamlit as st
from pillbox.engine import Reading,evaluate
from pillbox.simulation import SCENARIOS

st.set_page_config(page_title='Smart Pill Box | Demo',page_icon='💊',layout='centered')
st.title('Smart Pill Box — Software Demonstration')
st.warning('Prototype simulation only. Not a medical device. Does not determine whether someone swallowed a pill.')
st.write('Simulated RFID identification and accelerometer movement produce potential mismatch alerts.')
name=st.selectbox('Example scenario',list(SCENARIOS))
r=SCENARIOS[name]
with st.form('reading'):
    expected=st.text_input('Expected RFID tag',value=r.expected_tag)
    observed=st.text_input('Observed RFID tag (blank if missing)',value=r.observed_tag)
    acceleration=st.number_input('Acceleration change (g, simulated)',min_value=0.,max_value=10.,value=float(r.acceleration_g),step=.05)
    scheduled=st.checkbox('Within scheduled dose window',value=r.scheduled)
    submit=st.form_submit_button('Evaluate simulated event')
if submit:
    outcome=evaluate(Reading(expected,observed,acceleration,scheduled))
    if outcome['potential_error']:st.error('Potential issue: '+outcome['message'])
    else:st.success(outcome['message'])
    st.json(outcome)
st.caption('RFID identifies a tagged item; motion sensors cannot verify ingestion. All data on this page are demonstration inputs.')
