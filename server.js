const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/cardData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB bağlantısı başarılı!'))
    .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Orta katman
app.use(cors());
app.use(bodyParser.json());

// Mongoose Şeması ve Modeli
const CardSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Card = mongoose.model('Card', CardSchema);

// API Rotaları
app.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ message: 'Error fetching cards' });
    }
});

app.post('/cards', async (req, res) => {
    const newCard = new Card(req.body);
    try {
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(400).json({ message: 'Error creating card', error });
    }
});

// Yeni PUT route ekleniyor
app.put('/cards/:id', async (req, res) => {
    const { image, title, description } = req.body;

    if (!image || !title || !description) {
        return res.status(400).json({ message: "Tüm alanları doldurunuz." });
    }

    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            { image, title, description },
            { new: true } // Güncellenmiş belgeyi döndür
        );

        if (!updatedCard) {
            return res.status(404).json({ message: "Kart bulunamadı." });
        }

        res.json(updatedCard);
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ message: 'Error updating card', error });
    }
});

app.delete('/cards/:id', async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ message: 'Error deleting card', error });
    }
});

/*--------------Health Logs---------- */

const HealthLogSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, // Tarihi benzersiz yapıyoruz
    weight: { type: Number, required: true },
    waterIntake: { type: Number, required: true },
    exercise: { type: String, required: true },
}, { timestamps: true });

const HealthLog = mongoose.model('Health', HealthLogSchema);

app.post('/healthLogs', async (req, res) => {
    const { date, weight, waterIntake, exercise } = req.body;

    if (!date || !weight || !waterIntake || !exercise) {
        return res.status(400).json({ message: "Tüm alanları doldurunuz." });
    }

    try {
        const existingLog = await HealthLog.findOne({
            date: new Date(date).toDateString()
        });

        if (existingLog) {
            return res.status(400).json({ message: "Bugün için zaten bir sağlık logunuz mevcut." });
        }

        const newLog = new HealthLog({ date, weight, waterIntake, exercise });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error) {
        console.error('Error creating health log:', error);
        res.status(500).json({ message: 'Error creating health log', error });
    }
});

app.get('/healthLogs', async (req, res) => {
    console.log("Health logs endpoint hit");
    try {
        const logs = await HealthLog.find();
        res.json(logs);
    } catch (error) {
        console.error('Error fetching health logs:', error);
        res.status(500).json({ message: 'Error fetching health logs' });
    }
});

// Health logs güncelleme
app.put('/healthLogs/:id', async (req, res) => {
    try {
        const { weight, waterIntake, exercise } = req.body;

        if (!weight || !waterIntake || !exercise) {
            return res.status(400).json({ message: "Tüm alanları doldurunuz." });
        }

        const updatedLog = await HealthLog.findByIdAndUpdate(
            req.params.id,
            { weight, waterIntake, exercise },
            { new: true }
        );

        if (!updatedLog) {
            return res.status(404).json({ message: "Log bulunamadı." });
        }

        res.json(updatedLog);
    } catch (error) {
        console.error('Error updating health log:', error);
        res.status(500).json({ message: 'Error updating health log', error });
    }
});

/*----------------Health Logs end----------- */

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor.`);
});
