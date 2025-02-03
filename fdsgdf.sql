CREATE TABLE mcq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    difficulty_level VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    user_type VARCHAR(60) NOT NULL
)


INSERT INTO mcq 
(question, option_a, option_b, option_c, option_d, correct_answer, difficulty_level, category) 
VALUES
('What causes wind to form?', 'Differences in air pressure', 'The rotation of the Earth', 'Changes in ocean temperature', 'The movement of tectonic plates', 'A', 'Easy', 'Weather'),
('What type of clouds are associated with thunderstorms?', 'Cirrus', 'Stratus', 'Cumulonimbus', 'Cumulus', 'C', 'Easy', 'Weather'),
('What is the main source of energy for the Earth''s weather systems?', 'The Moon', 'The Sun', 'The Oceans', 'The Core of the Earth', 'B', 'Easy', 'Weather'),
('What instrument is used to measure air pressure?', 'Thermometer', 'Barometer', 'Anemometer', 'Hygrometer', 'B', 'Easy', 'Weather'),
('What type of precipitation occurs when raindrops freeze before reaching the ground?', 'Rain', 'Sleet', 'Hail', 'Dew', 'B', 'Easy', 'Weather'),

('What is the Coriolis effect?', 'The deflection of winds due to Earth''s rotation', 'The change in wind direction due to temperature', 'The variation of air pressure with altitude', 'The cycle of water in the atmosphere', 'A', 'Medium', 'Weather'),
('What happens to air as it rises in the atmosphere?', 'It cools and expands', 'It warms and contracts', 'It remains the same', 'It heats up quickly', 'A', 'Medium', 'Weather'),
('What is the main cause of a monsoon?', 'Tectonic activity', 'Seasonal reversal of winds', 'Ocean currents', 'Deforestation', 'B', 'Medium', 'Weather'),
('Which type of front leads to long periods of steady rain?', 'Cold front', 'Warm front', 'Occluded front', 'Stationary front', 'B', 'Medium', 'Weather'),
('What is a microclimate?', 'Climate of a large region', 'Small-scale variations in climate', 'Long-term changes in global temperature', 'A desert climate', 'B', 'Medium', 'Weather'),

('What is an earthquake?', 'A large wave caused by wind', 'The shaking of the ground due to tectonic activity', 'A volcanic eruption', 'A storm with strong winds', 'B', 'Easy', 'Natural Disasters'),
('Which scale measures the strength of earthquakes?', 'Beaufort Scale', 'Richter Scale', 'Saffir-Simpson Scale', 'Mercalli Scale', 'B', 'Easy', 'Natural Disasters'),
('What is the main cause of a tsunami?', 'Strong winds', 'Underwater earthquake', 'Hurricane', 'Heavy rainfall', 'B', 'Easy', 'Natural Disasters'),
('Which natural disaster is most common in the Pacific Ring of Fire?', 'Hurricanes', 'Volcanoes', 'Blizzards', 'Droughts', 'B', 'Easy', 'Natural Disasters'),
('What is a fault line?', 'A type of volcano', 'A break in the Earth''s crust', 'A type of earthquake', 'A weather phenomenon', 'B', 'Easy', 'Natural Disasters'),

('What is the focus of an earthquake?', 'The point on the Earth’s surface above the earthquake', 'The point where the earthquake originates underground', 'The location where the most damage occurs', 'The boundary between tectonic plates', 'B', 'Medium', 'Natural Disasters'),
('What does the Saffir-Simpson scale measure?', 'The intensity of tornadoes', 'The severity of hurricanes', 'The magnitude of earthquakes', 'The speed of tsunamis', 'B', 'Medium', 'Natural Disasters'),
('What causes a volcanic eruption?', 'Sudden cooling of magma', 'Movement of magma due to pressure buildup', 'Earthquakes occurring at the ocean floor', 'Changes in wind patterns', 'B', 'Medium', 'Natural Disasters'),
('Which type of volcano has gentle slopes and erupts fluid lava?', 'Composite volcano', 'Shield volcano', 'Cinder cone volcano', 'Supervolcano', 'B', 'Medium', 'Natural Disasters'),
('What is liquefaction?', 'When rocks turn into magma', 'When the ground behaves like a liquid due to seismic activity', 'When water floods an earthquake zone', 'When lava solidifies quickly', 'B', 'Medium', 'Natural Disasters'),

('What is the greenhouse effect?', 'The warming of the Earth due to trapped heat by gases', 'An increase in plant growth due to CO2', 'The reflection of sunlight by clouds', 'Cooling of the planet due to pollution', 'A', 'Hard', 'Climate Change'),
('Which gas is the most significant contributor to climate change?', 'Oxygen', 'Methane', 'Carbon dioxide', 'Nitrogen', 'C', 'Hard', 'Climate Change'),
('How does deforestation contribute to climate change?', 'By reducing oxygen levels', 'By decreasing carbon dioxide', 'By increasing carbon dioxide in the atmosphere', 'By increasing ocean currents', 'C', 'Hard', 'Climate Change'),
('Which international agreement aims to reduce global carbon emissions?', 'Kyoto Protocol', 'Paris Agreement', 'Montreal Protocol', 'Copenhagen Accord', 'B', 'Hard', 'Climate Change'),
('What is carbon sequestration?', 'The process of removing CO2 from the atmosphere and storing it', 'The destruction of forests for carbon storage', 'The release of carbon dioxide from fossil fuels', 'The capture of carbon in ocean currents', 'A', 'Hard', 'Climate Change');
