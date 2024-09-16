import csv

# Function to clean the latitude and longitude by removing dots in wrong places
def clean_coordinates(value):
    value = value.replace('.', '', value.count('.') - 1)  # Remove excess dots
    return float(value)

# Read the CSV file
file_path = 'staging.csv'
output_file_path = 'output.txt'

data = []
with open(file_path, mode='r') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        try:
            longitude = clean_coordinates(row['longitude'])
            latitude = clean_coordinates(row['latitude'])
            
            # Check if 'li' is valid and can be converted to a float
            if row['li'] != '' and row['li'] is not None:
                li = float(row['li'])
            else:
                li = None  # You can choose to skip, assign a default value, or handle this case

            data.append({
                'longitude': longitude,
                'latitude': latitude,
                'li': li
            })

        except ValueError as e:
            print(f"Error processing row: {row}, error: {e}")

# Write the result to a text file
with open(output_file_path, mode='w') as output_file:
    for entry in data:
        output_file.write(f"{entry}\n")