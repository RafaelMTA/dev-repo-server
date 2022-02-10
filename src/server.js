import 'dotenv/config';
import app from './app.js';

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
})