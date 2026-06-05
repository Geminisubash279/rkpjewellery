const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER || "db_ac6cf3_rkp_admin",
  password: process.env.DB_PASSWORD || "Rkp@2026",
  server: process.env.DB_SERVER || "sql5105.site4now.net",
  database: process.env.DB_NAME || "db_ac6cf3_rkp",
  port: parseInt(process.env.DB_PORT) || 1433,
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectionTimeout: 30000,
    requestTimeout: 30000
  }
};

let pool = null;

const getPool = async () => {
  if (pool && pool.connected) return pool;
  pool = await new sql.ConnectionPool(dbConfig).connect();
  pool.on("error", err => {
    console.error("❌ Pool error:", err.message);
    pool = null;
  });
  console.log("✅ Database pool connected at", new Date().toISOString());
  return pool;
};

const connectToDatabase = async () => {
  try {
    await getPool();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    setTimeout(connectToDatabase, 5000);
  }
};

connectToDatabase();

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "✅ Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// DB STATUS
app.get("/db-status", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request().query("SELECT 1 as test");
    res.json({ status: "✅ Database connected", test: result.recordset, timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: "❌ Database error", error: err.message });
  }
});

// SEND OTP
app.post("/sendotp", async (req, res) => {
  const mobile = req.body.mobile;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const p = await getPool();
    await p.request()
      .input("mobile", sql.NVarChar, mobile)
      .input("otp", sql.Int, otp)
      .query("INSERT INTO OTPLOGIN (MOBILENO, OTP) VALUES (@mobile, @otp)");
    const message = encodeURIComponent(`Dear Customer, Your Admin Login OTP is ${otp}. Please do not share this OTP. Regards, RKP Jewellery, Contact : 8300455155, 7598439019`);
    const smsurl = `http://smsssl.dial4sms.com/api/v2/SendSMS?SenderId=GSTMAL&Message=${message}&MobileNumbers=${mobile}&TemplateId=1107177331753219594&ApiKey=oTnpvYW0SZHzTnZMMGRTduZiWgmeeLsNgih73EcB5uQ=&ClientId=00c75859-dcde-4119-b9eb-706300d04a5b`;
    await axios.get(smsurl);
    res.json({ success: true, message: "OTP Sent", otp });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

// VERIFY OTP
app.post("/verifyotp", async (req, res) => {
  const { mobile, otp } = req.body;
  try {
    const p = await getPool();
    const result = await p.request()
      .input("mobile", sql.NVarChar, mobile)
      .input("otp", sql.Int, parseInt(otp, 10))
      .query("SELECT TOP 1 * FROM OTPLOGIN WHERE MOBILENO = @mobile AND OTP = @otp ORDER BY id DESC");
    if (result.recordset.length > 0) {
      await p.request().input("mobile", sql.NVarChar, mobile).query("DELETE FROM OTPLOGIN WHERE MOBILENO = @mobile");
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

// LOGIN
app.post("/loginpassword", async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const p = await getPool();
    const result = await p.request()
      .input("mobile", sql.NVarChar, mobile)
      .input("password", sql.NVarChar, password)
      .query("SELECT TOP 1 Mobile FROM Customers WHERE Mobile = @mobile AND Password = @password");
    res.json({ success: result.recordset.length > 0 });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

// ADD CUSTOMER
app.post("/addCustomer", async (req, res) => {
  const { CustomerName, StreetName, Area, City, State, Mobile, Password, Empid, Location } = req.body;
  try {
    const p = await getPool();
    const check = await p.request().input("Mobile", sql.NVarChar, Mobile).query("SELECT TOP 1 Mobile FROM Customers WHERE Mobile = @Mobile");
    if (check.recordset.length > 0) {
      await p.request().input("Mobile", sql.NVarChar, Mobile).query("DELETE FROM Customers WHERE Mobile = @Mobile");
    }
    await p.request()
      .input("CustomerName", sql.NVarChar, CustomerName)
      .input("StreetName", sql.NVarChar, StreetName)
      .input("Area", sql.NVarChar, Area)
      .input("City", sql.NVarChar, City)
      .input("State", sql.NVarChar, State)
      .input("Mobile", sql.NVarChar, Mobile)
      .input("Password", sql.NVarChar, Password)
      .input("Empid", sql.NVarChar, Empid || "")
      .input("Location", sql.NVarChar, Location || "")
      .query(`INSERT INTO Customers (CustomerName, StreetName, Area, City, State, Mobile, Password, Empid, Location, RDATE)
              VALUES (@CustomerName, @StreetName, @Area, @City, @State, @Mobile, @Password, @Empid, @Location,
              CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'))`);
    res.send({ status: "success" });
  } catch (err) {
    console.log(err);
    res.send({ status: "error" });
  }
});

// GET CUSTOMER PROFILE
app.get("/customerprofile", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request()
      .input("mobile", sql.NVarChar, req.query.mobile)
      .query("SELECT CustomerName, StreetName, Area, City, State, Mobile FROM Customers WHERE Mobile = @mobile");
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
    res.send([]);
  }
});

// CHECK CUSTOMER
app.get("/checkcustomer", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request()
      .input("mobile", sql.NVarChar, req.query.mobile)
      .query("SELECT CustomerName, StreetName, Area, City, State, Mobile FROM Customers WHERE Mobile = @mobile");
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

// LOAD SCHEME
app.get("/loadscheme", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request()
      .input("schemename", sql.NVarChar, req.query.schemename)
      .query(`SELECT schemeName, groupcode + '-' + convert(varchar, regno) as accno, weightledger, MetalType, FixedIns,
        (SELECT TOP 1 SRATE FROM RATEMAST AS M WHERE RATEGROUP=(SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE=M.RDATE) AND METALID='G' AND PURITY='91.6' ORDER BY SNO DESC) AS GOLDRATE,
        (SELECT TOP 1 SRATE FROM RATEMAST AS M WHERE RATEGROUP=(SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE=M.RDATE) AND METALID='S' AND PURITY='91.6' ORDER BY SNO DESC) AS SILVERRATE
        FROM scheme WHERE schemeid = @schemename`);
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
    res.send([]);
  }
});

// CUSTOMER LEDGER DETAILS
app.get("/customerLedgerDet", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request()
      .input("accno", sql.NVarChar, req.query.accno)
      .query(`SELECT CONVERT(VARCHAR,M.JOINDATE,105) AS DATE, S.SCHEMENAME AS schemename,
        (MAX(T.INSTALLMENT) + 1) AS UNPAID, P.PNAME AS customername,
        P.DOORNO + ', ' + P.ADDRESS1 AS StreetName, P.Area AS area, P.City AS city, P.Mobile AS mobile
        FROM SCHEMEMAST M
        LEFT JOIN SCHEME S ON S.SCHEMEID = M.SCHEMEID
        LEFT JOIN SCHPERSONALINFO P ON P.PERSONALID = M.SNO
        LEFT JOIN SCHEMETRAN T ON T.GROUPCODE = M.GROUPCODE AND T.REGNO = M.REGNO AND ISNULL(T.CANCEL,'') = ''
        WHERE M.GROUPCODE + '-' + CONVERT(VARCHAR,M.REGNO) = @accno
        GROUP BY M.JOINDATE, S.Instalment, S.schemeName, P.PNAME, P.DOORNO, P.ADDRESS1, P.AREA, P.CITY, P.MOBILE`);
    res.send(result.recordset[0]);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});

// CUSTOMER PAYMENT DETAILS
app.get("/customerPayment", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request()
      .input("accno", sql.NVarChar, req.query.accno)
      .query(`SELECT CONVERT(VARCHAR,M.JOINDATE,105) AS DATE, S.SCHEMENAME, S.INSTALMENT, S.WEIGHTLEDGER,
        CASE WHEN S.METALTYPE = 'G' THEN 'GOLD' ELSE 'SILVER' END AS METALTYPE,
        (SELECT TOP 1 RDATE FROM SCHEMETRAN WHERE ISNULL(CANCEL,'')='' AND GROUPCODE=M.GROUPCODE AND REGNO=M.REGNO ORDER BY RDATE DESC) LASTTRANDATE,
        (SELECT TOP 1 INSTALLMENT FROM SCHEMETRAN WHERE ISNULL(CANCEL,'')='' AND GROUPCODE=M.GROUPCODE AND REGNO=M.REGNO ORDER BY RDATE DESC) LASTINS,
        CASE WHEN S.FIXEDINS='N' THEN 0 ELSE (SELECT DISTINCT AMOUNT FROM SCHEMETRAN WHERE ISNULL(CANCEL,'')='' AND GROUPCODE=M.GROUPCODE AND REGNO=M.REGNO) END AS AMOUNT,
        (SELECT TOP 1 SRATE FROM RATEMAST AS M WHERE RATEGROUP=(SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE=M.RDATE) AND METALID='G' AND PURITY='91.6' ORDER BY SNO DESC) AS GOLDRATE,
        (SELECT TOP 1 SRATE FROM RATEMAST AS M WHERE RATEGROUP=(SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE=M.RDATE) AND METALID='S' AND PURITY='91.6' ORDER BY SNO DESC) AS SILVERRATE
        FROM SCHEMEMAST M
        LEFT JOIN SCHEME S ON S.SCHEMEID = M.SCHEMEID
        LEFT JOIN SCHPERSONALINFO P ON P.PERSONALID = M.SNO
        WHERE M.GROUPCODE + '-' + CONVERT(VARCHAR,M.REGNO) = @accno`);
    res.send(result.recordset[0]);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});

// GET CUSTOMER ACCOUNTS
app.get("/getCustomerAccount", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request()
      .input("mobile", sql.NVarChar, req.query.mobile)
      .query(`SELECT S.SCHEMENAME, M.GROUPCODE+'-'+CONVERT(VARCHAR,M.REGNO) ACCNO,
        CONVERT(VARCHAR,JOINDATE,105) AS JOINDATE,
        (CASE WHEN ISNULL(DOCLOSE,'')='' THEN 'ACTIVE' ELSE 'CLOSED' END) STATUS,
        (SELECT COUNT(*) FROM SCHEMETRAN T WHERE GROUPCODE=M.GROUPCODE AND REGNO=M.REGNO AND ISNULL(CANCEL,'')='') TOTALINS,
        CONVERT(VARCHAR,DATEADD(day,365,JOINDATE),105) AS LASTRECDATE,
        (SELECT COUNT(*) FROM SCHEMETRAN WHERE GROUPCODE=M.GROUPCODE AND REGNO=M.REGNO AND ISNULL(CANCEL,'')=''
          AND MONTH(RDATE)=MONTH(CONVERT(DATE,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'))
          AND YEAR(RDATE)=YEAR(CONVERT(DATE,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'))) AS PAIDTHISMONTH,
        (SELECT SUM(AMOUNT) FROM SCHEMETRAN T WHERE GROUPCODE=M.GROUPCODE AND REGNO=M.REGNO AND ISNULL(CANCEL,'')='') AMOUNT,
        (SELECT CONVERT(NUMERIC(15,3),SUM(WEIGHT)) FROM SCHEMETRAN T WHERE GROUPCODE=M.GROUPCODE AND REGNO=M.REGNO AND ISNULL(CANCEL,'')='') WEIGHT,
        CONVERT(VARCHAR,(SELECT TOP 1 RDATE FROM SCHEMETRAN WHERE GROUPCODE=M.GROUPCODE AND REGNO=M.REGNO AND ISNULL(CANCEL,'')='' ORDER BY RDATE DESC),105) AS LASTTRANDATE
        FROM SCHEMEMAST M
        LEFT JOIN SCHEME S ON S.SCHEMEID=M.SCHEMEID
        WHERE M.SNO IN (SELECT PERSONALID FROM SCHPERSONALINFO WHERE MOBILE=@mobile)
        ORDER BY M.JOINDATE DESC`);
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
    res.send([]);
  }
});

// LEDGER
app.get("/ledger", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request()
      .input("accno", sql.NVarChar, req.query.accno)
      .query(`SELECT INSTALLMENT, CONVERT(VARCHAR,RDATE,105) AS DATE, RECEIPTNO, AMOUNT, RATE, WEIGHT,
        ISNULL(BonusWeight,0) AS BONUSWEIGHT FROM SCHEMETRAN
        WHERE ISNULL(CANCEL,'')='' AND GROUPCODE+'-'+CONVERT(VARCHAR,REGNO)=@accno ORDER BY RDATE`);
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
    res.send([]);
  }
});

// GOLD RATE
app.get("/goldrate", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request().query(`SELECT TOP 1 SRATE AS RATE FROM RATEMAST AS M
      WHERE RATEGROUP=(SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE=M.RDATE) AND METALID='G' AND PURITY='91.6' ORDER BY SNO DESC`);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// SILVER RATE
app.get("/silverrate", async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request().query(`SELECT TOP 1 SRATE FROM RATEMAST AS M
      WHERE RATEGROUP=(SELECT MAX(RATEGROUP) FROM RATEMAST WHERE RDATE=M.RDATE) AND METALID='S' AND PURITY='91.6' ORDER BY SNO DESC`);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// PAYMENT SUCCESS
app.post("/payment-success", async (req, res) => {
  const { payment_id, order_id, amount, accno, metal, rate, weight, installment,
    customername, address, area, city, mobile, bonus, payment_mode: pm, upi_id: uid } = req.body;
  const payment_mode = pm || "upi";
  const upi_id = uid || null;
  try {
    const p = await getPool();
    await p.request()
      .input("payment_id", sql.NVarChar, payment_id)
      .input("order_id", sql.NVarChar, order_id)
      .input("amount", sql.Decimal(18,2), amount)
      .input("accno", sql.NVarChar, accno)
      .input("metal", sql.NVarChar, metal)
      .input("rate", sql.Decimal(18,2), rate)
      .input("weight", sql.Decimal(18,3), weight)
      .input("installment", sql.Int, installment)
      .input("payment_mode", sql.NVarChar, payment_mode)
      .input("upi_id", sql.NVarChar, upi_id)
      .input("customername", sql.NVarChar, customername)
      .input("address", sql.NVarChar, address)
      .input("area", sql.NVarChar, area)
      .input("city", sql.NVarChar, city)
      .input("mobile", sql.NVarChar, mobile)
      .input("bonus", sql.Decimal(18,3), bonus)
      .query(`INSERT INTO PaymentTable (trandate,payment_id,order_id,amount,accno,metal,rate,weight,installment,payment_mode,upi_id,card_last4,card_type,customername,address,area,city,mobile,bonus)
        VALUES (CONVERT(DATE,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),
        @payment_id,@order_id,@amount,@accno,@metal,@rate,@weight,@installment,@payment_mode,@upi_id,NULL,NULL,@customername,@address,@area,@city,@mobile,@bonus)`);

    await p.request().input("payment_id", sql.NVarChar, payment_id).query(`
      INSERT INTO SCHEMETRAN (GROUPCODE,REGNO,AMOUNT,WEIGHT,RATE,RDATE,CANCEL,SYSTEMID,INSTALLMENT,EMPID,REMARKS,ENTREFNO,USERID,BonusWeight,APPVER,ST_ID,SNO,RECEIPTNO)
      SELECT SUBSTRING(accno,1,CHARINDEX('-',accno)-1),SUBSTRING(accno,CHARINDEX('-',accno)+1,LEN(accno)),
      AMOUNT,WEIGHT,RATE,CONVERT(DATE,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),
      '',1,installment,1,payment_id,
      'ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),
      999,bonus,'ONL APP',
      'ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),
      'ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),
      TRANID FROM PaymentTable WHERE payment_id=@payment_id`);

    await p.request().input("payment_id", sql.NVarChar, payment_id).query(`
      INSERT INTO SCHEMECOLLECT (GROUPCODE,REGNO,RECEIPTNO,RDATE,AMOUNT,MODEPAY,ACCODE,ENTREFNO,CANCEL,SYSTEMID,USERID,APPVER,TRANMODE,SC_ID,SNO,CHQ_CARDNO,CHQDATE,CHQBANK)
      SELECT GROUPCODE,REGNO,RECEIPTNO,RDATE,AMOUNT,
      (SELECT CASE WHEN PAYMENT_MODE='upi' THEN 'E' ELSE 'C' END FROM PAYMENTTABLE WHERE payment_id=@payment_id),
      '0000001',ENTREFNO,'',SYSTEMID,999,'ONL APP','D',ST_ID,SNO,REMARKS,
      CONVERT(DATE,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),
      (SELECT upi_id FROM PAYMENTTABLE WHERE payment_id=@payment_id)
      FROM SCHEMETRAN WHERE REMARKS=@payment_id`);

    res.json({ success: true, payment_mode, upi_id });
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.json({ success: false, error: err.message });
  }
});

// NEW SCHEME PAYMENT SUCCESS
app.post("/newschpay-success", async (req, res) => {
  const { payment_id, order_id, amount, schemeid, metal, rate, weight, installment,
    customername, address, area, city, mobile, bonus, payment_mode: pm, upi_id: uid } = req.body;
  const payment_mode = pm || "upi";
  const upi_id = uid || null;
  try {
    const p = await getPool();
    const transaction = new sql.Transaction(p);
    await transaction.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);
    try {
      const r1 = new sql.Request(transaction);
      const schemeRow = await r1.input("schemeid", sql.NVarChar, schemeid)
        .query("SELECT GROUPCODE, REGNO FROM SCHEME WITH (UPDLOCK, ROWLOCK) WHERE SCHEMEID = @schemeid");
      const groupcode = schemeRow.recordset[0].GROUPCODE;
      const regno = schemeRow.recordset[0].REGNO;
      const accno = `${groupcode}-${regno}`;

      await new sql.Request(transaction)
        .input("payment_id", sql.NVarChar, payment_id)
        .input("order_id", sql.NVarChar, order_id)
        .input("amount", sql.Decimal(18,2), amount)
        .input("accno", sql.NVarChar, accno)
        .input("metal", sql.NVarChar, metal)
        .input("rate", sql.Decimal(18,2), rate)
        .input("weight", sql.Decimal(18,3), weight)
        .input("installment", sql.Int, installment)
        .input("payment_mode", sql.NVarChar, payment_mode)
        .input("upi_id", sql.NVarChar, upi_id)
        .input("customername", sql.NVarChar, customername)
        .input("address", sql.NVarChar, address)
        .input("area", sql.NVarChar, area)
        .input("city", sql.NVarChar, city)
        .input("mobile", sql.NVarChar, mobile)
        .input("bonus", sql.Decimal(18,3), bonus)
        .query(`INSERT INTO PaymentTable (trandate,payment_id,order_id,amount,accno,metal,rate,weight,installment,payment_mode,upi_id,card_last4,card_type,customername,address,area,city,mobile,bonus)
          VALUES (CONVERT(DATE,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),
          @payment_id,@order_id,@amount,@accno,@metal,@rate,@weight,@installment,@payment_mode,@upi_id,NULL,NULL,@customername,@address,@area,@city,@mobile,@bonus)`);

      await new sql.Request(transaction).input("payment_id", sql.NVarChar, payment_id).input("bonus", sql.Decimal(18,3), bonus).query(`
        INSERT INTO SCHEMETRAN (GROUPCODE,REGNO,AMOUNT,WEIGHT,RATE,RDATE,CANCEL,SYSTEMID,INSTALLMENT,EMPID,REMARKS,ENTREFNO,USERID,BonusWeight,APPVER,ST_ID,SNO,RECEIPTNO)
        SELECT SUBSTRING(accno,1,CHARINDEX('-',accno)-1),SUBSTRING(accno,CHARINDEX('-',accno)+1,LEN(accno)),
        AMOUNT,WEIGHT,RATE,CONVERT(DATE,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),
        '',1,1,1,payment_id,
        'ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),
        999,@bonus,'ONL APP',
        'ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),
        'ON'+REPLACE(CONVERT(VARCHAR(10),GETDATE(),112)+CONVERT(VARCHAR(8),GETDATE(),108),':',''),
        TRANID FROM PaymentTable WHERE payment_id=@payment_id`);

      await new sql.Request(transaction).input("payment_id", sql.NVarChar, payment_id).input("upi_id", sql.NVarChar, upi_id).query(`
        INSERT INTO SCHEMECOLLECT (GROUPCODE,REGNO,RECEIPTNO,RDATE,AMOUNT,MODEPAY,ACCODE,ENTREFNO,CANCEL,SYSTEMID,USERID,APPVER,TRANMODE,SC_ID,SNO,CHQ_CARDNO,CHQDATE,CHQBANK)
        SELECT GROUPCODE,REGNO,RECEIPTNO,RDATE,AMOUNT,
        (SELECT CASE WHEN PAYMENT_MODE='upi' THEN 'E' ELSE 'C' END FROM PAYMENTTABLE WHERE payment_id=@payment_id),
        '0000001',ENTREFNO,'',SYSTEMID,999,'ONL APP','D',ST_ID,SNO,REMARKS,
        CONVERT(DATE,GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time'),@upi_id
        FROM SCHEMETRAN WHERE REMARKS=@payment_id`);

      await new sql.Request(transaction).input("payment_id", sql.NVarChar, payment_id).input("customername", sql.NVarChar, customername)
        .input("address", sql.NVarChar, address).input("area", sql.NVarChar, area)
        .input("city", sql.NVarChar, city).input("mobile", sql.NVarChar, mobile).query(`
        INSERT INTO SCHPERSONALINFO (PERSONALID,PNAME,SNAME,DOORNO,ADDRESS1,ADDRESS2,AREA,CITY,STATE,COUNTRY,PINCODE,MOBILE,NOMENI,EMAIL,APPVER,USERID)
        SELECT GROUPCODE+CONVERT(VARCHAR,REGNO)+CONVERT(VARCHAR,RECEIPTNO),@customername,'','',@address,'',@area,@city,'','','',@mobile,'','',APPVER,USERID
        FROM SCHEMETRAN WHERE REMARKS=@payment_id`);

      await new sql.Request(transaction).input("payment_id", sql.NVarChar, payment_id).query(`
        INSERT INTO SCHEMEMAST (COMPANYID,SCHEMEID,GROUPCODE,REGNO,JOINDATE,IEMP,IGROUPCODE,IREGNO,HOMECOLLECT,REMARK,SIGNATUREPATH,USERID,OPENINGDATE,SNO,COSTID,TOTALINS,INTRO,TOTALQTY,APPVER,PREVILEGEID)
        SELECT 'GTM',(SELECT SCHEMEID FROM SCHEME WHERE GROUPCODE=T.GROUPCODE),GROUPCODE,REGNO,RDATE,0,'',0,'N','','',999,RDATE,
        GROUPCODE+CONVERT(VARCHAR,REGNO)+CONVERT(VARCHAR,RECEIPTNO),'',(SELECT Instalment FROM SCHEME WHERE GROUPCODE=T.GROUPCODE),0,1,APPVER,0
        FROM SCHEMETRAN T WHERE REMARKS=@payment_id`);

      await new sql.Request(transaction).input("payment_id", sql.NVarChar, payment_id).query(`
        UPDATE SCHEME SET REGNO=REGNO+1 WHERE GROUPCODE IN (SELECT GROUPCODE FROM SCHEMETRAN T WHERE REMARKS=@payment_id)`);

      await transaction.commit();
      res.json({ success: true, payment_mode, upi_id });
    } catch (innerErr) {
      await transaction.rollback();
      console.log("❌ Transaction rolled back:", innerErr.message);
      res.json({ success: false, error: innerErr.message });
    }
  } catch (err) {
    console.log("❌ ERROR newschpay:", err.message);
    res.json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

process.on("SIGTERM", () => server.close(async () => { if (pool) await pool.close(); process.exit(0); }));
process.on("SIGINT",  () => server.close(async () => { if (pool) await pool.close(); process.exit(0); }));
process.on("unhandledRejection", (reason) => console.error("❌ Unhandled Rejection:", reason));
process.on("uncaughtException", (error) => { console.error("❌ Uncaught Exception:", error); process.exit(1); });
