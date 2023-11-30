
# Seeding companies
# company1 = Company.create(name: 'Costa Cat', description: 'Our COSTA CAT I is a luxury, 55 foot, fully air-conditioned catamaran. The COSTA CAT II, our newest addition, is a 39 foot, open-air catamaran. Both luxury catamarans cruise from the world class Los Sueños Resort & Marina.', address: 'Los Sueños Marina, Herradura, Costa Rica', contact_info: 'www.costacat.com')
# company2 = Company.create(name: 'Mangle Tours', description: 'Puntarenas-based tour operator specializing in providing unique water adventures and unforgettable experiences.', address: 'Puntarenas', contact_info: 'https://mangle-tours.negocio.site/')
# company3 = Company.create(name: 'Cocos Tours', description: 'tours to the nearest islands and beaches', address: 'Puntarenas', contact_info: 'https://www.facebook.com/cocospuntarenas/')
# company4 = Company.create(name: 'Blue Magic Tours', description: 'A beautiful boat that will take you to the most beautiful beaches in puntarenas', address: 'Puntarenas', contact_info: 'www.blue-magic.com')
# company5 = Company.create(name: 'Calypso Cruises', description: 'a catamaran that takes you to the most beautiful beach in punarenas', address: 'Puntarenas', contact_info: 'www.Calypso-cruises.com')




# Seeding tours
tour1 = Tour.create(name: 'Tour to Isla Tortuga', description: 'we will take you to the pretiest beach in Puntarenas', duration: '8 hours', price: 150 , availability: true, company_id:1, quantity: 70 , includes: 'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails')

tour2 = Tour.create(name: 'Private tour', description: 'you can make your own tour', duration: '8 hours', price: 3000 , availability: true, company_id:10, quantity: 50 , includes: 'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails, kayaks, jet-ski, paddle boards ')

tour3 = Tour.create(name: 'San Lucas Tour', description: 'a trip to Isla San Lucas, to the beach and the famous abandoned prision', duration: '6 hours', price:120 , availability: true, company_id:10, quantity:70 , includes:'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails')

tour4 = Tour.create(name: 'Whales and Dolphin sightseeing', description: 'Let go and search for whales and dolfin so we can see them in their natural habit', duration: '5 hours', price: 80 , availability: true, company_id:10, quantity: 50 , includes:'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails')

tour5 = Tour.create(name: 'Scuba tour', description: 'Learn how to scuba dive near a island full of fish', duration: '6 hours', price: 100 , availability: true, company_id:10, quantity: 45 , includes:'water, iced tea, coffe, fruits, lunch,coctails')

tour6 = Tour.create(name: 'Isla del coco Tour', description: 'a tour to the most beautiful island in Costa Rica', duration: '3 days', price: 500 , availability: true, company_id:10, quantity: 40 , includes:'water, iced tea, coffe, fruits, breakfast, lunch, dinner, snorkel, banana boat and coctails')

tour7 = Tour.create(name: 'Fishing Tour', description: 'lets go have fun and fish', duration: '7 hours', price: 100 , availability: true, company_id:10, quantity: 25 , includes:'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails')

tour8 = Tour.create(name: 'Sunset Tour', description: 'lets go and see a beautiful sunset and enjoy all the colors it has to offer', duration: '3 hours', price: 60 , availability: true, company_id:10, quantity: 70, includes: 'water, iced tea, coffe, fruits, dinner, snorkel, banana boat and coctails')

tour9 = Tour.create(name: 'Isla San Lucas tour', description: 'A historical tour in the San Lucas Island National Park will take you on a fascinating journey through time. This island, once home to a notorious prison, offers a rich history that includes elements of crime, punishment, and injustices.', duration: '8 hours', price: 80 , availability: true, company_id:11, quantity: 20 , includes:'National Park entrance,Fresh fruit,Bottled water,Tour guide (English and Spanish),Life vests, Dolphin watching.')

tour10 = Tour.create(name: 'Tortuga Island Tour', description: 'A tour to Tortuga Island is an exciting adventure that takes you to a paradisiacal island in the middle of the Gulf of Nicoya, Costa Rica. With white sandy beaches, crystal-clear waters, and lush tropical vegetation, ', duration: '8 hours', price: 80 , availability: true, company_id:11, quantity: 30 , includes: 'Fresh fruit,Lunch,Coffee,Bottled water,Tour guide (English and Spanish),Life vests,Dolphin watching,Snorkeling.' )

tour11= Tour.create(name: 'BIOLUMINESCENCE TOUR', description: 'Embark on an unforgettable nocturnal journey with our Bioluminescence Tour! Discover the fascinating world of natural light emitted by marine organisms as you explore the dark waters of the night. ', duration: '4 hours', price: 50 , availability: true, company_id:11, quantity: 25 , includes:'Fresh fruit,Lunch,Coffee,Bottled water,Tour guide (English and Spanish),Life vests,Dolphin watching,Snorkeling.')

tour12 = Tour.create(name: 'Tour to Isla Tortuga', description: 'we will take you to the pretiest beach in Puntarenas', duration: '8 hours', price: 150 , availability: true, company_id:12, quantity: 70 , includes: 'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails')

tour13 = Tour.create(name: 'Private tour', description: 'you can make your own tour', duration: '8 hours', price: 3000 , availability: true, company_id:10, quantity: 50 , includes: 'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails, kayaks, jet-ski, paddle boards ')

tour3 = Tour.create(name: 'San Lucas Tour', description: 'a trip to Isla San Lucas, to the beach and the famous abandoned prision', duration: '6 hours', price:120 , availability: true, company_id:10, quantity:70 , includes:'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails')

tour14 = Tour.create(name: 'Whales and Dolphin sightseeing', description: 'Let go and search for whales and dolfin so we can see them in their natural habit', duration: '5 hours', price: 80 , availability: true, company_id:1, quantity: 50 , includes:'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails')

tour15 = Tour.create(name: 'Scuba tour', description: 'Learn how to scuba dive near a island full of fish', duration: '6 hours', price: 100 , availability: true, company_id:12, quantity: 45 , includes:'water, iced tea, coffe, fruits, lunch,coctails')

tour16 = Tour.create(name: 'Isla del coco Tour', description: 'a tour to the most beautiful island in Costa Rica', duration: '3 days', price: 500 , availability: true, company_id:1, quantity: 40 , includes:'water, iced tea, coffe, fruits, breakfast, lunch, dinner, snorkel, banana boat and coctails')

tour17 = Tour.create(name: 'Fishing Tour', description: 'lets go have fun and fish', duration: '7 hours', price: 100 , availability: true, company_id:13, quantity: 25 , includes:'water, iced tea, coffe, fruits, lunch, snorkel, banana boat and coctails')

tour18 = Tour.create(name: 'Sunset Tour', description: 'lets go and see a beautiful sunset and enjoy all the colors it has to offer', duration: '3 hours', price: 60 , availability: true, company_id:14, quantity: 70, includes: 'water, iced tea, coffe, fruits, dinner, snorkel, banana boat and coctails')

tour19 = Tour.create(name: 'Isla San Lucas tour', description: 'A historical tour in the San Lucas Island National Park will take you on a fascinating journey through time. This island, once home to a notorious prison, offers a rich history that includes elements of crime, punishment, and injustices.', duration: '8 hours', price: 80 , availability: true, company_id:15, quantity: 20 , includes:'National Park entrance,Fresh fruit,Bottled water,Tour guide (English and Spanish),Life vests, Dolphin watching.')

tour20 = Tour.create(name: 'Tortuga Island Tour', description: 'A tour to Tortuga Island is an exciting adventure that takes you to a paradisiacal island in the middle of the Gulf of Nicoya, Costa Rica. With white sandy beaches, crystal-clear waters, and lush tropical vegetation, ', duration: '8 hours', price: 80 , availability: true, company_id:11, quantity: 30 , includes: 'Fresh fruit,Lunch,Coffee,Bottled water,Tour guide (English and Spanish),Life vests,Dolphin watching,Snorkeling.' )

