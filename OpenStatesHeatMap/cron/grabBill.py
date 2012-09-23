from sunlight import openstates
import json

topics = ['Agriculture and Food', 'Animal Rights and Wildlife Issues',
            'Arts and Humanities', 'Budget, Spending, and Taxes', 'Business and Consumers',
            'Campaign Finance and Election Issues', 'Civil Liberties and Civil Rights',
            'Commerce', 'Crime', 'Drugs', 'Education', 'Energy', 'Environmental',
            'Executive Branch', 'Family and Chilren Issues',
            'Federal, State, and Local Issues', 'Gambling and Gaming', 'Government Reform',
            'Guns', 'Health', 'Housing and Property', 'Immigration', 'Indigenous Peoples',
            'Insurance', 'Judiciary', 'Labor and Employment', 'Legal Issues', 
            'Legislative Affairs', 'Military', 'Municipal and County Issues',
            'Nominations', 'Other', 'Public Services', 'Recreation', 'Reproductive Issues',
            'Resolutions', 'Science and Medical Research', 'Senior Issues',
            'Sexual Orientation and Gender Issues', 'Social Issues', 'State Agencies',
            'Technology and Communication', 'Trade', 'Transportation', 'Welfare and Poverty'] 

states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "PR"]

for topic in topics:
    for state_abbr in states:
        bills = openstates.bills(
            search_window='session',
            subject=topic,
            state=state_abbr)
        bills_json = json.dumps(bills, sort_keys=True, indent=4)
        f = open('../json/' + state_abbr + '-' + topic.replace(',', '').replace(' ', '') + '.json', 'w')
        f.write(bills_json)
        f.close()
