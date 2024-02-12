
import 'dotenv/config';
export const adminlogin = (req, res) => {

    console.log("login called");
    const { id, password } = req.body;

    //    sirf admin ek ke login ke liye me hash and jwt use karu ? law*a mera...
    if (id == process.env.ID && password == process.env.PASSWORD) {
        return res.json({ status: true })
    } else {
        return res.json({ status: false })

    }
}