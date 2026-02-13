-- Create provinces table
CREATE TABLE IF NOT EXISTS provinces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Create districts table
CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    province_id INT REFERENCES provinces(id),
    name VARCHAR(50) NOT NULL
);

-- Enable RLS
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (since this is static reference data)
CREATE POLICY "Enable read access for all users" ON provinces FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON districts FOR SELECT USING (true);

-- Insert data into provinces
INSERT INTO provinces (id, name) VALUES 
(1, 'Western'), (2, 'Central'), (3, 'Southern'), 
(4, 'Northern'), (5, 'Eastern'), (6, 'North Western'), 
(7, 'North Central'), (8, 'Uva'), (9, 'Sabaragamuwa')
ON CONFLICT (id) DO NOTHING;

-- Insert data into districts
INSERT INTO districts (province_id, name) VALUES 
(1, 'Colombo'), (1, 'Gampaha'), (1, 'Kalutara'),
(2, 'Kandy'), (2, 'Matale'), (2, 'Nuwara Eliya'),
(3, 'Galle'), (3, 'Matara'), (3, 'Hambantota'),
(4, 'Jaffna'), (4, 'Kilinochchi'), (4, 'Mannar'), (4, 'Vavuniya'), (4, 'Mullaitivu'),
(5, 'Trincomalee'), (5, 'Batticaloa'), (5, 'Ampara'),
(6, 'Kurunegala'), (6, 'Puttalam'),
(7, 'Anuradhapura'), (7, 'Polonnaruwa'),
(8, 'Badulla'), (8, 'Moneragala'),
(9, 'Ratnapura'), (9, 'Kegalle')
ON CONFLICT DO NOTHING; -- Assuming id might be auto-generated differently or handled by serial, but conflict content is usually on PK. Since we didn't specify district IDs, conflict might not trigger on ID. Safe to just run insert.
