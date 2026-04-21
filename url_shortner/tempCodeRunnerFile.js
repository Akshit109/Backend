
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectionDb('mongodb://127.0.0.1:27017/URL_SHORTNER')
