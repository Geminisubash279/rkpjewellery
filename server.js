const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ RAILWAY DATABASE CONFIGURATION
const config = {
  user: process.env.DB_USER || "db_ac6cf3_rkp_admin",
  password: process.env.DB_PASSWORD || "Rkp@2026",
  server: process.env.DB_SERVER || "sql5105.site4now.net",
  database: process.env.DB_NAME || "db_ac6cf3_rkp",
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectionTimeout: 30000,
    requestTimeout: 30000
  }
};

// ✅ CONNECT TO DATABASE WITH RETRY LOGIC
const connectToDatabase = async () => {
  try {
    await sql.connect(config);
    console.log("✅ Database connected successfully at", new Date().toISOString());
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    console.log("⚠️ Retrying database connection in 5 seconds...");
    setTimeout(connectToDatabase, 5000);
  }
};

// Initialize database connection
connectToDatabase();

// ✅ HEALTH CHECK ENDPOINT (Railway requires this for load balancer)
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "✅ Server is running", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// ✅ DATABASE STATUS ENDPOINT
app.get("/db-status", async (req, res) => {
  try {
    const result = await sql.query("SELECT 1 as test");
    res.json({ 
      status: "✅ Database connected", 
      test: result.recordset,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({ 
      status: "❌ Database error", 
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// SEND OTP
app.post("/sendotp", async (req, res) => {
  const mobile = req.body.mobile;
  const otp = Math.floor(100000 + Math.random() * 900000); 

  try {await sql.query `INSERT INTO OTPLOGIN (MOBILENO, OTP) VALUES (${mobile}, ${otp})`;
    const message = encodeURIComponent(`Dear Customer, Your Admin Login OTP is ${otp}. Please do not share this OTP. Regards, RKP Jewellery, Contact : 8300455155, 7598439019`);
    const smsurl = `http://smsssl.dial4sms.com/api/v2/SendSMS?SenderId=GSTMAL&Message=${message}&MobileNumbers=${mobile}&TemplateId=1107177331753219594&ApiKey=oTnpvYW0SZHzTnZMMGRTduZiWgmeeLsNgih73EcB5uQ=&ClientId=00c75859-dcde-4119-b9eb-706300d04a5b`;
    await axios.get(smsurl);
    res.json({
      success: true,
      message: "OTP Sent",
      otp: otp
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

//verify OTP
app.post("/verifyotp", async (req, res) => {
  const { mobile, otp } = req.body;
  const otpInt = parseInt(otp, 10);
  try {
    const result = await sql.query`
      SELECT TOP 1 * FROM OTPLOGIN
      WHERE MOBILENO = ${mobile} AND OTP = ${otpInt} ORDER BY id DESC`;

    if (result.recordset.length > 0) {
      await sql.query`DELETE FROM OTPLOGIN WHERE MOBILENO = ${mobile}`;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});




// Login
app.post("/loginpassword", async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const result = await sql.query`
      SELECT TOP 1 Mobile FROM Customers WHERE Mobile = ${mobile} AND Password = ${password}`;
    if (result.recordset.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

//add customer
app.post("/addCustomer", async (req, res) => {
  const { CustomerName, StreetName, Area, City, State, Mobile, Password, Empid, Location } = req.body;
  try {
    await sql.connect(config);
    const checkMobile = await sql.query`SELECT TOP 1 Mobile FROM Customers WHERE Mobile = ${Mobile}`;
    if (checkMobile.recordset.length > 0) {
      await sql.query`DELETE FROM Customers WHERE Mobile = ${Mobile}`;
    }
    const insertReq = new sql.Request();
    insertReq.input('CustomerName', sql.NVarChar, CustomerName);
    insertReq.input('StreetName', sql.NVarChar, StreetName);
    insertReq.input('Area', sql.NVarChar, Area);
    insertReq.input('City', sql.NVarChar, City);
    insertReq.input('State', sql.NVarChar, State);
    insertReq.input('Mobile', sql.NVarChar, Mobile);
    insertReq.input('Password', sql.NVarChar, Password);
    insertReq.input('Empid', sql.NVarChar, Empid || '');
    insertReq.input('Location', sql.NVarChar, Location || '');
    await insertReq.query(`INSERT INTO Customers (CustomerName, StreetName, Area, City, State, Mobile, Password, Empid, Location, RDATE) VALUES (@CustomerName, @StreetName, @Area, @City, @State, @Mobile, @Password, @Empid, @Location, CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'))`);
    res.send({ status: "success" });
  } catch (err) {
    console.log(err);
    res.send({ status: "error" });
  }
});

//get Customer Details
app.get("/customerprofile", async (req, res) => {
  const mobile = req.query.mobile;
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT CustomerName, StreetName, Area, City, State, Mobile FROM Customers WHERE Mobile = ${mobile} `;
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

//check customer exists by mobile
app.get("/checkcustomer", async (req, res) => {
  const mobile = req.query.mobile;
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT CustomerName, StreetName, Area, City, State, Mobile FROM Customers WHERE Mobile = ${mobile}`;
    if (result.recordset.length > 0) {
      res.json({ exists: true, customer: result.recordset[0] });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ exists: false });
  }
});

//get scheme details
app.get("/loadscheme", async (req, res) => {
  const schemename = req.query.schemename; // ✅ FIXED

  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT schemeName, groupcode + '-' + convert(varchar, regno) as accno, weightledger, MetalType, FixedIns,
      (SELECT TOP 1 SRATE AS RATE FROM RATEMAST AS M WHERE RATEGROUP = (SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE = M.RDATE) AND METALID='G' AND PURITY='91.6' ORDER BY SNO DESC) AS GOLDRATE,
      (SELECT TOP 1 SRATE AS RATE FROM RATEMAST AS M WHERE RATEGROUP = (SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE = M.RDATE) AND METALID='S' AND PURITY='91.6' ORDER BY SNO DESC) AS SILVERRATE
       FROM scheme WHERE schemeid = ${schemename}`;
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

//get Customer ledger Details
app.get("/customerLedgerDet", async (req, res) => {
  const accno = req.query.accno;

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT CONVERT(VARCHAR,M.JOINDATE,105) AS DATE, S.SCHEMENAME AS schemename,(MAX(T.INSTALLMENT) + 1) AS UNPAID, P.PNAME AS customername, P.DOORNO + ', ' + P.ADDRESS1 AS StreetName, P.Area AS area, P.City AS city,
      P.Mobile AS mobile FROM SCHEMEMAST M  LEFT JOIN SCHEME S ON S.SCHEMEID = M.SCHEMEID LEFT JOIN SCHPERSONALINFO P ON P.PERSONALID = M.SNO  LEFT JOIN SCHEMETRAN T ON T.GROUPCODE = M.GROUPCODE AND T.REGNO = M.REGNO AND ISNULL(T.CANCEL,'') = ''  
      WHERE M.GROUPCODE + '-' + CONVERT(VARCHAR,M.REGNO) = ${accno} GROUP BY M.JOINDATE , S.Instalment, S.schemeName ,
      P.PNAME, P.DOORNO , P.ADDRESS1 , P.AREA, P.CITY, P.MOBILE `;

    res.send(result.recordset[0]);   // ⭐ FIX

  } catch (err) {
    console.log(err);
  }
});

//get Customer payment screen Details
app.get("/customerPayment", async (req, res) => {
  const accno = req.query.accno;

  try {
    await sql.connect(config);

    const result = await sql.query`
    SELECT CONVERT(VARCHAR,M.JOINDATE,105) AS DATE, S.SCHEMENAME, S.INSTALMENT,  S.WEIGHTLEDGER , CASE WHEN S.METALTYPE = 'G' THEN 'GOLD' ELSE 'SILVER' END AS METALTYPE,
      (SELECT TOP 1 RDATE FROM SCHEMETRAN WHERE ISNULL(CANCEL,'') = '' AND GROUPCODE = M.GROUPCODE AND REGNO = M.REGNO ORDER BY RDATE DESC) LASTTRANDATE, 
      (SELECT TOP 1 INSTALLMENT FROM SCHEMETRAN WHERE ISNULL(CANCEL,'') = '' AND GROUPCODE = M.GROUPCODE AND REGNO = M.REGNO ORDER BY RDATE DESC) LASTINS, 
      CASE WHEN S.FIXEDINS = 'N' THEN 0 ELSE (SELECT DISTINCT AMOUNT FROM SCHEMETRAN WHERE ISNULL(CANCEL,'') = '' AND GROUPCODE = M.GROUPCODE AND REGNO = M.REGNO ) END AS AMOUNT,
      (SELECT TOP 1 SRATE AS RATE FROM RATEMAST AS M WHERE RATEGROUP = (SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE = M.RDATE) AND METALID='G' AND PURITY='91.6' ORDER BY SNO DESC) AS GOLDRATE,
      (SELECT TOP 1 SRATE AS RATE FROM RATEMAST AS M WHERE RATEGROUP = (SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE = M.RDATE) AND METALID='S' AND PURITY='91.6' ORDER BY SNO DESC) AS SILVERRATE
      FROM SCHEMEMAST M  LEFT JOIN SCHEME S ON S.SCHEMEID = M.SCHEMEID LEFT JOIN SCHPERSONALINFO P ON P.PERSONALID = M.SNO 
      WHERE M.GROUPCODE + '-' + CONVERT(VARCHAR,M.REGNO) = ${accno} `;     
    
    res.send(result.recordset[0]);   

  } catch (err) {
    console.log(err);
  }
});


//get Customer Account
app.get("/getCustomerAccount", async (req, res) => {
  const mobile = req.query.mobile;
  try {
    await sql.connect(config);
    const result = await sql.query`
     select S.SCHEMENAME, M.GROUPCODE + '-' + CONVERT(VARCHAR,M.REGNO) ACCNO, CONVERT(VARCHAR,JOINDATE,105) AS JOINDATE, 
    (CASE WHEN ISNULL(DOCLOSE,'') = '' THEN 'ACTIVE' ELSE 'CLOSED' END)  STATUS, 
    (SELECT COUNT(*) FROM SCHEMETRAN T WHERE GROUPCODE = M.GROUPCODE AND REGNO = M.REGNO AND ISNULL(CANCEL,'') = '') TOTALINS,
    CONVERT(VARCHAR,DATEADD(day, 365, JOINDATE),105) AS LASTRECDATE, 
    (SELECT COUNT(*) FROM SCHEMETRAN WHERE GROUPCODE = M.GROUPCODE AND REGNO = M.REGNO AND ISNULL(CANCEL,'') = '' AND MONTH(RDATE) = MONTH(CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time')) AND YEAR(RDATE) = YEAR(CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'))) AS PAIDTHISMONTH,
    (SELECT SUM(AMOUNT) FROM SCHEMETRAN T WHERE GROUPCODE = M.GROUPCODE AND REGNO = M.REGNO AND ISNULL(CANCEL,'') = '') AMOUNT, 
    (SELECT CONVERT(NUMERIC(15,3),SUM(WEIGHT)) AS WE FROM SCHEMETRAN T WHERE GROUPCODE = M.GROUPCODE AND REGNO = M.REGNO AND ISNULL(CANCEL,'') = '') WEIGHT,
    CONVERT(VARCHAR,(SELECT TOP 1 RDATE FROM SCHEMETRAN WHERE GROUPCODE = M.GROUPCODE AND REGNO = M.REGNO AND ISNULL(CANCEL,'') = '' ORDER BY RDATE DESC),105) AS LASTTRANDATE
    from SCHEMEMAST M
    LEFT JOIN SCHEME S ON S.SCHEMEID = M.SCHEMEID WHERE M.SNO IN (SELECT PERSONALID FROM SCHPERSONALINFO WHERE MOBILE =  ${mobile}) ORDER BY M.JOINDATE DESC `;
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

//get Customer Account
app.get("/ledger", async (req, res) => {
  const accno = req.query.accno;
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT INSTALLMENT, CONVERT(VARCHAR,RDATE,105) AS DATE, RECEIPTNO, AMOUNT, RATE, WEIGHT, ISNULL(BonusWeight,0) AS BONUSWEIGHT FROM SCHEMETRAN WHERE ISNULL(CANCEL,'') = '' AND GROUPCODE + '-' + CONVERT(VARCHAR,REGNO) = ${accno} ORDER BY RDATE`;
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
  }
});


//payment sucess and record store in sql table
app.post("/payment-success", async (req, res) => {
  const Razorpay = require("razorpay");

  const razorpay = new Razorpay({
    key_id: "rzp_test_SxRh2Udirr1XPt",
    key_secret: "<rzp_test_key_secret>"
  });

  const {
    payment_id,
    order_id,
    amount,
    accno,
    metal,
    rate,
    weight,
    installment,
    customername,
    address,
    area,
    city,
    mobile,
    bonus
  } = req.body;

  console.log("✅ Payment Success Request Received:", { 
    payment_id, 
    accno, 
    amount, 
    weight, 
    bonus: bonus ? bonus : "⚠️ BONUS IS NULL/ZERO" 
  });

  try {
    await sql.connect(config);

    const payment = await razorpay.payments.fetch(payment_id);

    console.log("Razorpay Response:", payment);

    // ✅ AUTO DETECT MODE
    const payment_mode = payment.method; // upi / card / wallet / netbanking
    const upi_id = payment.vpa || null;
    const card_last4 = payment.card?.last4 || null;
    const card_type = payment.card?.network || null;

    // ✅ STORE IN PaymentTable
    console.log("📝 Storing in PaymentTable with bonus:", bonus);
    await sql.query`
      INSERT INTO PaymentTable
      (trandate,payment_id, order_id, amount, accno, metal, rate, weight, installment, payment_mode, upi_id, card_last4, card_type,customername,address,area,city,mobile,bonus)
      VALUES
      (CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),${payment_id}, ${order_id}, ${amount}, ${accno}, ${metal}, ${rate}, ${weight}, ${installment}, ${payment_mode}, ${upi_id}, ${card_last4},${card_type}, ${customername},${address},${area},${city},${mobile},${bonus})
    `;

    console.log("✅ Stored in PaymentTable successfully");

    await sql.query`
      INSERT INTO SCHEMETRAN (GROUPCODE, REGNO, AMOUNT, WEIGHT, RATE,  RDATE, CANCEL, SYSTEMID, INSTALLMENT, EMPID, 
      REMARKS, ENTREFNO, USERID, BonusWeight, APPVER, ST_ID, SNO, RECEIPTNO)
      SELECT  SUBSTRING(accno, 1, CHARINDEX('-', accno) - 1), SUBSTRING(accno, CHARINDEX('-', accno) + 1, LEN(accno)),
      AMOUNT, WEIGHT, RATE, CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'), '', 1, installment, 1, payment_id,'ON' + REPLACE(CONVERT(VARCHAR(10), GETDATE(), 112) + CONVERT(VARCHAR(8), GETDATE(), 108), ':', ''), 999, BONUS, 'ONL APP',
      'ON' + REPLACE(CONVERT(VARCHAR(10), GETDATE(), 112) + CONVERT(VARCHAR(8), GETDATE(), 108), ':', ''),
      'ON' + REPLACE(CONVERT(VARCHAR(10), GETDATE(), 112) + CONVERT(VARCHAR(8), GETDATE(), 108), ':', ''), TRANID FROM PaymentTable  WHERE payment_id = ${payment_id}`;

    console.log("✅ Stored in SCHEMETRAN successfully");

    await sql.query`
      INSERT INTO SCHEMECOLLECT (GROUPCODE,REGNO,RECEIPTNO,RDATE,AMOUNT, MODEPAY,ACCODE,ENTREFNO,CANCEL,SYSTEMID,  
      USERID,APPVER,TRANMODE,SC_ID,SNO,CHQ_CARDNO,CHQDATE,CHQBANK)
      SELECT  GROUPCODE, REGNO, RECEIPTNO, RDATE, AMOUNT, (SELECT CASE WHEN PAYMENT_MODE = 'upi' THEN 'E' ELSE 'C' END FROM PAYMENTTABLE WHERE payment_id = ${payment_id}), 
      '0000001', ENTREFNO, '', SYSTEMID, 999, 'ONL APP', 'D', ST_ID, SNO, REMARKS, CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'), (SELECT ${upi_id} FROM PAYMENTTABLE WHERE payment_id = ${payment_id}) 
      FROM SCHEMETRAN WHERE REMARKS = ${payment_id}`;

    console.log("✅ Stored in SCHEMECOLLECT successfully");

    res.json({
      success: true,
      payment_mode,
      upi_id,
      card_last4,
      card_type
    });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.json({ success: false, error: err.message });
  }
});

// new scheme payment sucess
app.post("/newschpay-success", async (req, res) => {
  const Razorpay = require("razorpay");

  const razorpay = new Razorpay({
    key_id: "rzp_test_SxRh2Udirr1XPt",
    key_secret: "<rzp_test_key_secret>"
  });

  const {
    payment_id,
    order_id,
    amount,
    schemeid,
    metal,
    rate,
    weight,
    installment,
    customername,
    address,
    area,
    city,
    mobile,
    bonus
  } = req.body;

  console.log("✅ New Scheme Payment Request Received:", { 
    payment_id, 
    schemeid, 
    amount, 
    weight, 
    bonus: bonus ? bonus : "⚠️ BONUS IS NULL/ZERO" 
  });

  try {
    await sql.connect(config);

    const payment = await razorpay.payments.fetch(payment_id);
    const payment_mode = payment.method;
    const upi_id = payment.vpa || null;
    const card_last4 = payment.card?.last4 || null;
    const card_type = payment.card?.network || null;

    // ✅ Use SERIALIZABLE transaction to prevent duplicate REGNO
    const pool = await sql.connect(config);
    const transaction = new sql.Transaction(pool);
    await transaction.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);

    try {
      // Lock SCHEME row and read fresh REGNO inside transaction
      const req1 = new sql.Request(transaction);
      req1.input('schemeid', sql.NVarChar, schemeid);
      const schemeRow = await req1.query(`SELECT GROUPCODE, REGNO FROM SCHEME WITH (UPDLOCK, ROWLOCK) WHERE SCHEMEID = @schemeid`);
      const groupcode = schemeRow.recordset[0].GROUPCODE;
      const regno = schemeRow.recordset[0].REGNO;
      const accno = `${groupcode}-${regno}`;

      const req2 = new sql.Request(transaction);
      req2.input('payment_id', sql.NVarChar, payment_id);
      req2.input('order_id', sql.NVarChar, order_id);
      req2.input('amount', sql.Decimal(18,2), amount);
      req2.input('accno', sql.NVarChar, accno);
      req2.input('schemeid', sql.NVarChar, schemeid);
      req2.input('metal', sql.NVarChar, metal);
      req2.input('rate', sql.Decimal(18,2), rate);
      req2.input('weight', sql.Decimal(18,3), weight);
      req2.input('installment', sql.Int, installment);
      req2.input('payment_mode', sql.NVarChar, payment_mode);
      req2.input('upi_id', sql.NVarChar, upi_id);
      req2.input('card_last4', sql.NVarChar, card_last4);
      req2.input('card_type', sql.NVarChar, card_type);
      req2.input('customername', sql.NVarChar, customername);
      req2.input('address', sql.NVarChar, address);
      req2.input('area', sql.NVarChar, area);
      req2.input('city', sql.NVarChar, city);
      req2.input('mobile', sql.NVarChar, mobile);
      req2.input('bonus', sql.Decimal(18,3), bonus);
      await req2.query(`INSERT INTO PaymentTable (trandate,payment_id,order_id,amount,accno,metal,rate,weight,installment,payment_mode,upi_id,card_last4,card_type,customername,address,area,city,mobile,bonus) VALUES (CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),@payment_id,@order_id,@amount,@accno,@metal,@rate,@weight,@installment,@payment_mode,@upi_id,@card_last4,@card_type,@customername,@address,@area,@city,@mobile,@bonus)`);

      const req3 = new sql.Request(transaction);
      req3.input('payment_id', sql.NVarChar, payment_id);
      req3.input('bonus', sql.Decimal(18,3), bonus);
      await req3.query(`INSERT INTO SCHEMETRAN (GROUPCODE,REGNO,AMOUNT,WEIGHT,RATE,RDATE,CANCEL,SYSTEMID,INSTALLMENT,EMPID,REMARKS,ENTREFNO,USERID,BonusWeight,APPVER,ST_ID,SNO,RECEIPTNO) SELECT SUBSTRING(accno,1,CHARINDEX('-',accno)-1),SUBSTRING(accno,CHARINDEX('-',accno)+1,LEN(accno)),AMOUNT,WEIGHT,RATE,CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),'',1,1,1,payment_id,'ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),999,@bonus,'ONL APP','ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),'ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),TRANID FROM PaymentTable WHERE payment_id=@payment_id`);

      const req4 = new sql.Request(transaction);
      req4.input('payment_id', sql.NVarChar, payment_id);
      req4.input('upi_id', sql.NVarChar, upi_id);
      await req4.query(`INSERT INTO SCHEMECOLLECT (GROUPCODE,REGNO,RECEIPTNO,RDATE,AMOUNT,MODEPAY,ACCODE,ENTREFNO,CANCEL,SYSTEMID,USERID,APPVER,TRANMODE,SC_ID,SNO,CHQ_CARDNO,CHQDATE,CHQBANK) SELECT GROUPCODE,REGNO,RECEIPTNO,RDATE,AMOUNT,(SELECT CASE WHEN PAYMENT_MODE='upi' THEN 'E' ELSE 'C' END FROM PAYMENTTABLE WHERE payment_id=@payment_id),'0000001',ENTREFNO,'',SYSTEMID,999,'ONL APP','D',ST_ID,SNO,REMARKS,CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),@upi_id FROM SCHEMETRAN WHERE REMARKS=@payment_id`);

      const req5 = new sql.Request(transaction);
      req5.input('payment_id', sql.NVarChar, payment_id);
      req5.input('customername', sql.NVarChar, customername);
      req5.input('address', sql.NVarChar, address);
      req5.input('area', sql.NVarChar, area);
      req5.input('city', sql.NVarChar, city);
      req5.input('mobile', sql.NVarChar, mobile);
      await req5.query(`INSERT INTO SCHPERSONALINFO (PERSONALID,PNAME,SNAME,DOORNO,ADDRESS1,ADDRESS2,AREA,CITY,STATE,COUNTRY,PINCODE,MOBILE,NOMENI,EMAIL,APPVER,USERID) SELECT GROUPCODE+CONVERT(VARCHAR,REGNO)+CONVERT(VARCHAR,RECEIPTNO),@customername,'','',@address,'',@area,@city,'','','',@mobile,'','',APPVER,USERID FROM SCHEMETRAN WHERE REMARKS=@payment_id`);

      const req6 = new sql.Request(transaction);
      req6.input('payment_id', sql.NVarChar, payment_id);
      await req6.query(`INSERT INTO SCHEMEMAST (COMPANYID,SCHEMEID,GROUPCODE,REGNO,JOINDATE,IEMP,IGROUPCODE,IREGNO,HOMECOLLECT,REMARK,SIGNATUREPATH,USERID,OPENINGDATE,SNO,COSTID,TOTALINS,INTRO,TOTALQTY,APPVER,PREVILEGEID) SELECT 'GTM',(SELECT SCHEMEID FROM SCHEME WHERE GROUPCODE=T.GROUPCODE),GROUPCODE,REGNO,RDATE,0,'',0,'N','','',999,RDATE,GROUPCODE+CONVERT(VARCHAR,REGNO)+CONVERT(VARCHAR,RECEIPTNO),'',(SELECT Instalment FROM SCHEME WHERE GROUPCODE=T.GROUPCODE),0,1,APPVER,0 FROM SCHEMETRAN T WHERE REMARKS=@payment_id`);

      const req7 = new sql.Request(transaction);
      req7.input('payment_id', sql.NVarChar, payment_id);
      await req7.query(`UPDATE SCHEME SET REGNO=REGNO+1 WHERE GROUPCODE IN (SELECT GROUPCODE FROM SCHEMETRAN T WHERE REMARKS=@payment_id)`);

      await transaction.commit();
      console.log('✅ Transaction committed successfully');
      res.json({ success: true, payment_mode, upi_id, card_last4, card_type });

    } catch (innerErr) {
      await transaction.rollback();
      console.log('❌ Transaction rolled back:', innerErr.message);
      res.json({ success: false, error: innerErr.message });
    }

  } catch (err) {
    console.log("❌ ERROR newschpay:", err.message);
    res.json({ success: false, error: err.message });
  }
});


//get gold rate
app.get("/goldrate", async (req, res) => {
  try {
    const result = await sql.query(`SELECT TOP 1 SRATE AS RATE FROM RATEMAST AS M WHERE RATEGROUP = (SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE = M.RDATE) AND METALID='G' AND PURITY='91.6' ORDER BY SNO DESC`);
    res.json(result.recordset);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

  //get silver rate
  app.get("/silverrate", async (req, res) => {
    try {
      const result = await sql.query(`SELECT TOP 1 SRATE FROM RATEMAST AS M WHERE RATEGROUP = (SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE = M.RDATE) AND METALID='S' AND PURITY='91.6' ORDER BY SNO DESC`);
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🚀 SERVER STARTED SUCCESSFULLY           ║
╠════════════════════════════════════════════╣
║  Port: ${PORT}                                │
║  Environment: ${NODE_ENV}                    │
║  URL: http://0.0.0.0:${PORT}                 │
║  Time: ${new Date().toISOString()}         │
╚════════════════════════════════════════════╝
  `);
});

// ✅ GRACEFUL SHUTDOWN FOR RAILWAY
process.on("SIGTERM", async () => {
  console.log("⚠️ SIGTERM received, shutting down gracefully...");
  server.close(async () => {
    console.log("✅ Server closed");
    try {
      await sql.close();
      console.log("✅ Database connection closed");
    } catch (err) {
      console.error("Error closing database:", err.message);
    }
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("⚠️ SIGINT received, shutting down gracefully...");
  server.close(async () => {
    console.log("✅ Server closed");
    try {
      await sql.close();
      console.log("✅ Database connection closed");
    } catch (err) {
      console.error("Error closing database:", err.message);
    }
    process.exit(0);
  });
});

// ✅ UNHANDLED REJECTION HANDLER
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

// ✅ UNCAUGHT EXCEPTION HANDLER
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});