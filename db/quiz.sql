DROP TABLE IF EXISTS user_responses;
DROP TABLE IF EXISTS mcq;
DROP TABLE IF EXISTS users;

CREATE TABLE mcq (
    question_id INT GENERATED ALWAYS AS IDENTITY,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    difficulty_level VARCHAR(20) NOT NULL CHECK (difficulty_level IN ('Easy','Medium','Hard')),
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (question_id)
);

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    user_type VARCHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE user_responses (
    response_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL, -- WHO IS DOING QUIZ --
    score INT NOT NULL,
    incorrect_categories TEXT[],
    PRIMARY KEY (response_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);



INSERT INTO mcq 
(question, option_a, option_b, option_c, option_d, correct_answer, difficulty_level, category) 
VALUES
-- Nature Geography Questions (Easy, Medium, Hard)
('Which biome is characterized by low temperatures and permafrost?', 'Tundra', 'Desert', 'Rainforest', 'Savanna', 'A', 'Easy', 'Nature Geography'),
('What is the largest rainforest in the world?', 'Congo Rainforest', 'Daintree Rainforest', 'Amazon Rainforest', 'Borneo Rainforest', 'C', 'Easy', 'Nature Geography'),
('Which of these is a major cause of desertification?', 'Deforestation', 'Volcanic Eruption', 'Tsunami', 'Hurricane', 'A', 'Easy', 'Nature Geography'),
('What is a watershed?', 'A natural barrier blocking water flow', 'An area of land that drains into a river', 'A deep ocean trench', 'A type of underground water source', 'B', 'Easy', 'Nature Geography'),
('Which of the following is a freshwater ecosystem?', 'Coral reef', 'Mangrove forest', 'Pond', 'Open ocean', 'C', 'Easy', 'Nature Geography'),

('What is the process of rocks breaking down due to weather exposure?', 'Erosion', 'Weathering', 'Sedimentation', 'Deposition', 'B', 'Medium', 'Nature Geography'),
('Which type of volcano has explosive eruptions?', 'Shield volcano', 'Cinder cone volcano', 'Composite volcano', 'Fissure volcano', 'C', 'Medium', 'Nature Geography'),
('What is the largest coral reef system in the world?', 'Great Barrier Reef', 'Belize Barrier Reef', 'Red Sea Coral Reef', 'New Caledonia Barrier Reef', 'A', 'Medium', 'Nature Geography'),
('What term describes a valley carved by glaciers?', 'Gorge', 'Fjord', 'Canyon', 'Delta', 'B', 'Medium', 'Nature Geography'),
('What is a meander?', 'A type of rock formation', 'A winding curve in a river', 'A volcanic crater', 'A coral reef structure', 'B', 'Medium', 'Nature Geography'),

('Which type of rock is formed from the cooling and solidification of magma?', 'Sedimentary', 'Igneous', 'Metamorphic', 'Fossiliferous', 'B', 'Hard', 'Nature Geography'),
('What is the term for a steep, nearly vertical cliff face formed by erosion?', 'Escarpment', 'Mesa', 'Basin', 'Rift Valley', 'A', 'Hard', 'Nature Geography'),
('Which natural landform is created when a river cuts deeply into bedrock over time?', 'Plateau', 'Canyon', 'Delta', 'Fjord', 'B', 'Hard', 'Nature Geography'),
('What is the largest drainage basin in the world?', 'Nile Basin', 'Amazon Basin', 'Ganges-Brahmaputra Basin', 'Congo Basin', 'B', 'Hard', 'Nature Geography'),
('What is a karst landscape primarily formed by?', 'Glacial activity', 'Volcanic eruptions', 'Dissolution of soluble rocks', 'Tectonic movements', 'C', 'Hard', 'Nature Geography'),

-- Human Geography Questions (Easy, Medium, Hard)
('What is urbanization?', 'Growth of rural areas', 'Increase in city populations', 'Decrease in industrial activity', 'Expansion of forests', 'B', 'Easy', 'Human Geography'),
('Which factor most influences population density?', 'Climate', 'Government policies', 'Elevation', 'Access to water', 'D', 'Easy', 'Human Geography'),
('What is a push factor in migration?', 'A reason attracting people to a place', 'A reason making people leave a place', 'A type of farming method', 'A form of pollution', 'B', 'Easy', 'Human Geography'),
('Which of these is an example of a primary economic activity?', 'Banking', 'Farming', 'Teaching', 'Retail sales', 'B', 'Easy', 'Human Geography'),
('What is a megalopolis?', 'A small rural town', 'A single large city', 'A region with multiple large cities', 'A farming community', 'C', 'Easy', 'Human Geography'),

('What is GDP?', 'Global Distribution Policy', 'Gross Domestic Product', 'General Development Plan', 'Geographical Data Processing', 'B', 'Medium', 'Human Geography'),
('Which of the following is an example of a secondary economic activity?', 'Fishing', 'Car manufacturing', 'Marketing', 'Software development', 'B', 'Medium', 'Human Geography'),
('What is carrying capacity?', 'The number of people an area can support sustainably', 'The maximum weight a bridge can hold', 'The amount of food a region can produce', 'The level of pollution a city can handle', 'A', 'Medium', 'Human Geography'),
('Which city is often called the financial capital of the world?', 'London', 'New York', 'Tokyo', 'Dubai', 'B', 'Medium', 'Human Geography'),
('What is the term for a community that relies heavily on one industry?', 'Sustainable city', 'Industrial complex', 'Single-industry town', 'Free market zone', 'C', 'Medium', 'Human Geography'),

('What is gentrification?', 'The process of urban renewal leading to increased property values', 'The expansion of slums in urban areas', 'A decrease in economic activity in a city', 'A method of farming in developing nations', 'A', 'Hard', 'Human Geography'),
('What is the primary purpose of the United Nations Human Development Index (HDI)?', 'To measure economic productivity', 'To rank countries based on human well-being', 'To track military spending', 'To study climate change', 'B', 'Hard', 'Human Geography'),
('What is an example of a tertiary economic activity?', 'Mining', 'Teaching', 'Iron smelting', 'Fishing', 'B', 'Hard', 'Human Geography'),
('Which of the following is a major impact of globalization?', 'Increased isolation of countries', 'More economic interdependence', 'A decrease in international trade', 'Stronger barriers between nations', 'B', 'Hard', 'Human Geography'),
('What is a remittance?', 'A payment made by a government to citizens', 'Money sent home by migrants working abroad', 'A type of business loan', 'A form of taxation on imported goods', 'B', 'Hard', 'Human Geography'),

--OLDER QUESTIONS--
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
