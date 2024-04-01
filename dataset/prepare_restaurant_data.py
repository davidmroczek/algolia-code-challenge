# This script merges restaurant data from two files into a new JSON file, which will be used to create a search index.

import csv
import json

JSON_FILE = '/Users/davidmroczek/Downloads/Algolia/project/dataset/restaurants_list.json'
CSV_FILE = '/Users/davidmroczek/Downloads/Algolia/project/dataset/restaurants_info.csv'
MERGED_DATASET = '/Users/davidmroczek/Downloads/Algolia/project/dataset/merged_dataset.json'

# Load the CSV data into a dictionary for quick access
csv_data = {}
with open(CSV_FILE, mode='r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=';')
    for row in reader:
        object_id = int(row['objectID'])
        csv_data[object_id] = row

# Load the JSON data
with open(JSON_FILE, 'r', encoding='utf-8') as jsonfile:
    json_data = json.load(jsonfile)

# Append CSV data to respective JSON objects 
for item in json_data:
    object_id = item['objectID']
    if object_id in csv_data:
        item.update(csv_data[object_id])

    # Replace "Diners Club" and "Carte Blanche" with "Discover" in payment_options
    # Remove "JCB", "Pay with OpenTable", and "Cash Only" from payment_options
    # Ensure payment_options only contains unique values
    if 'payment_options' in item:
        item['payment_options'] = ['Discover' if payment == 'Diners Club' or payment == 'Carte Blanche' else payment for payment in item['payment_options']]
        item['payment_options'] = [payment for payment in item['payment_options'] if payment not in ['JCB', 'Pay with OpenTable', 'Cash Only']]
        item['payment_options'] = list(set(item['payment_options']))

# Save the merged restaurant dataset to merged_dataset.json
with open(MERGED_DATASET, 'w', encoding='utf-8') as merged_dataset:
    json.dump(json_data, merged_dataset, indent=4)