import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, BackHandler } from "react-native";
import { Text, Button, Appbar } from "react-native-paper";

import { useFocusEffect } from '@react-navigation/native';

export default function SchemeDetails({ route, navigation }) {
  const { scheme, schemeId, mobile } = route?.params || {};
  const [lang, setLang] = useState("ta");

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => navigation.getParent()?.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation])
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
    return () => backHandler.remove();
  }, []);

  const titles = {
    gold: "DigiGold Scheme",
    silver: "DigiSilver Scheme",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <Appbar.Header style={{ backgroundColor: "#660606" }}>
        <Appbar.Action icon="arrow-left" color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content title={titles[scheme] || "Scheme Details"} color="#ffffff" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Language Toggle */}
        <View style={styles.langRow}>
          <Text
            style={[styles.langBtn, lang === "ta" && styles.langBtnActive]}
            onPress={() => setLang("ta")}>
            தமிழ்
          </Text>
          <Text
            style={[styles.langBtn, lang === "en" && styles.langBtnActive]}
            onPress={() => setLang("en")}>
            English
          </Text>
        </View>

        {/* ===== DIGIGOLD TAMIL ===== */}
        {scheme === "gold" && lang === "ta" && (
          <View>
            <Text style={styles.title}>DigiGold திட்ட விவரங்கள்</Text>
            <Text style={styles.body}>DigiGold என்பது மொபைல் செயலி மூலம் தங்கம் சேமிப்பதற்கான எளிய வழியாகும்.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சேருவதற்கு</Text><Text style={styles.cell}>"Join Now" கிளிக்</Text><Text style={styles.cell}>விவரங்கள் உள்ளிடவும்</Text><Text style={styles.cell}>சேமிப்பு தொடங்கவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>தங்கம் பொருட்களைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>கூடுதல் பலன்கள் (Slab System)</Text>
              <Text style={styles.body}>நீங்கள் பணம் செலுத்தும் நாட்களைப் பொறுத்து கூடுதல் தங்கம் வழங்கப்படும்:</Text>
              <Text style={styles.body}>•	1 – 75 நாட்கள்: 9% பலன்</Text>
              <Text style={styles.body}>•	76 – 150 நாட்கள்: 6.5% பலன்</Text>
              <Text style={styles.body}>•	151 – 225 நாட்கள்: 4% பலன்</Text>
              <Text style={styles.body}>•	226 – 300 நாட்கள்: 1.25% பலன்</Text>
              <Text style={styles.head}>முக்கிய அம்சங்கள்</Text>
              <Text style={styles.body}>•	குறைந்தபட்சத் தொகை: ₹100 முதல் சேமிக்கலாம்.</Text>
              <Text style={styles.body}>•	திட்ட காலம்: முதல் தவணையிலிருந்து 330 நாட்கள். நாள் 1-300 பலன்கள் மேலே இருக்கும்படி 9%-1.25% சதவீதம் தரப்படும். நாள் 300-330 கூடுதல் பலன்கள் கிடையாது.</Text>
              <Text style={styles.body}>•	மீட்பு: முதிர்வு தேதியிலிருந்து 35 நாட்களுக்குள் வெள்ளியாக மாற்ற வேண்டும். ஜிஎஸ்டி (GST), செய்கூலி மற்றும் சேதாரம் (VA) பொருந்தும்.</Text>
              <Text style={styles.body}>•	அடையாளச் சான்று: பதிவு செய்த நபர் மட்டுமே நகையை மீட்க முடியும் (ஆதார், பான் கார்டு அவசியம்).</Text>
              <Text style={styles.body}>•	நிபந்தனை: எக்காரணம் கொண்டும் செலுத்திய தொகை ரொக்கமாகத் திருப்பிக் கொடுக்கப்படாது.</Text>
              <Text style={styles.body}>•	தீர்வுகள்: திட்டம் தொடர்பான சந்தேகங்கள் அல்லது புகார்கள் நேரடி விசாரணையின் மூலம் மட்டுமே தீர்க்கப்படும்.</Text>
          </View>
        )}

        {/* ===== DIGIGOLD ENGLISH ===== */}
        {scheme === "gold" && lang === "en" && (
          <View>
            <Text style={styles.title}>DigiGold Scheme Details</Text>
            <Text style={styles.body}>DigiGold offers a convenient, mobile-based way to save for Gold.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Click "Join Now"</Text><Text style={styles.cell}>Fill in details</Text><Text style={styles.cell}>Pay amount</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Select jewellery</Text><Text style={styles.cell}>Submit OTP</Text></View>
            </View>
            <Text style={styles.head}>Bonus Slab System</Text>
            <Text style={styles.body}>The additional Gold weight benefit is calculated based on when you save:</Text>
            <Text style={styles.body}>•	1 – 75 Days: 9% Benefit</Text>
            <Text style={styles.body}>•	76 – 150 Days: 6.5% Benefit</Text>
            <Text style={styles.body}>•	151 – 225 Days: 4% Benefit</Text>
            <Text style={styles.body}>•	226 – 300 Days: 1.25% Benefit</Text>
            <Text style={styles.head}>Key Features</Text>
            <Text style={styles.body}>•	Investment: Start with as little as ₹100. Save any amount, any time.</Text>
            <Text style={styles.body}>•	Age limit: Anyone above 18 years of age is allowed to join. </Text>
            <Text style={styles.body}>•	Duration: The tenure is 330 days from the date of the first instalment. You can save Gold as many times as you wish during this period. Benefits apply from Day 1-300 within the 9%-1.25% slab as mentioned above. No benefits apply for day 301-330.The scheme matures on the 330th day.after the 330th day, Lock in period starts for 30 days.</Text>
            <Text style={styles.body}>•	Lock-in: No withdrawals allowed for the first 30 days. Scheme matures at the last day of lock-in.</Text>
            <Text style={styles.body}>•	Redemption: Must be converted to jewellery within 35 days of maturity. Taxes (GST), making charges, and wastage (VA) apply.</Text>
            <Text style={styles.body}>•	Verification: Only the registered user can redeem. Valid Govt ID (Aadhar, PAN, etc.) is mandatory.</Text>
            <Text style={styles.body}>•	Policy: No cash refunds under any circumstances.</Text>
            <Text style={styles.body}>•	Withdrawal / scheme closure before 330 days will result in forfeiture of accumulated weight and bonuses.</Text>
            <Text style={styles.body}>•	Disputes: All regulatory or benefit disputes are handled in-store and in-person only.</Text>
          </View>
        )}

        {/* ===== DIGISILVER TAMIL ===== */}
        {scheme === "silver" && lang === "ta" && (
          <View>
            <Text style={styles.title}>DigiSilver திட்ட விவரங்கள்</Text>
            <Text style={styles.body}>DigiSilver என்பது மொபைல் செயலி மூலம் வெள்ளி சேமிப்பதற்கான எளிய வழியாகும்.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சேருவதற்கு</Text><Text style={styles.cell}>"Join Now" கிளிக்</Text><Text style={styles.cell}>விவரங்கள் உள்ளிடவும்</Text><Text style={styles.cell}>சேமிப்பு தொடங்கவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>வெள்ளிப் பொருட்களைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>கூடுதல் பலன்கள் (Slab System)</Text>
              <Text style={styles.body}>நீங்கள் பணம் செலுத்தும் நாட்களைப் பொறுத்து கூடுதல் தங்கம் வழங்கப்படும்:</Text>
              <Text style={styles.body}>•	1 – 75 நாட்கள்: 9% பலன்</Text>
              <Text style={styles.body}>•	76 – 150 நாட்கள்: 6.5% பலன்</Text>
              <Text style={styles.body}>•	151 – 225 நாட்கள்: 4% பலன்</Text>
              <Text style={styles.body}>•	226 – 300 நாட்கள்: 1.25% பலன்</Text>
              <Text style={styles.head}>முக்கிய அம்சங்கள்</Text>
              <Text style={styles.body}>•	குறைந்தபட்சத் தொகை: ₹100 முதல் சேமிக்கலாம்.</Text>
              <Text style={styles.body}>•	திட்ட காலம்: முதல் தவணையிலிருந்து 330 நாட்கள். நாள் 1-300 பலன்கள் மேலே இருக்கும்படி 9%-1.25% சதவீதம் தரப்படும். நாள் 300-330 கூடுதல் பலன்கள் கிடையாது.</Text>
              <Text style={styles.body}>•	மீட்பு: முதிர்வு தேதியிலிருந்து 35 நாட்களுக்குள் வெள்ளியாக மாற்ற வேண்டும். ஜிஎஸ்டி (GST), செய்கூலி மற்றும் சேதாரம் (VA) பொருந்தும்.</Text>
              <Text style={styles.body}>•	அடையாளச் சான்று: பதிவு செய்த நபர் மட்டுமே நகையை மீட்க முடியும் (ஆதார், பான் கார்டு அவசியம்).</Text>
              <Text style={styles.body}>•	நிபந்தனை: எக்காரணம் கொண்டும் செலுத்திய தொகை ரொக்கமாகத் திருப்பிக் கொடுக்கப்படாது.</Text>
              <Text style={styles.body}>•	தீர்வுகள்: திட்டம் தொடர்பான சந்தேகங்கள் அல்லது புகார்கள் நேரடி விசாரணையின் மூலம் மட்டுமே தீர்க்கப்படும்.</Text>
          </View>
        )}

        {/* ===== DIGISILVER ENGLISH ===== */}
        {scheme === "silver" && lang === "en" && (
          <View>
            <Text style={styles.title}>DigiSilver Scheme Details</Text>
            <Text style={styles.body}>DigiSilver offers a convenient, mobile-based way to save for silver.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Click "Join Now"</Text><Text style={styles.cell}>Fill in details</Text><Text style={styles.cell}>Pay amount</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Select jewellery</Text><Text style={styles.cell}>Submit OTP</Text></View>
            </View>
            <Text style={styles.head}>Bonus Slab System</Text>
            <Text style={styles.body}>The additional silver weight benefit is calculated based on when you save:</Text>
            <Text style={styles.body}>•	1 – 75 Days: 9% Benefit</Text>
            <Text style={styles.body}>•	76 – 150 Days: 6.5% Benefit</Text>
            <Text style={styles.body}>•	151 – 225 Days: 4% Benefit</Text>
            <Text style={styles.body}>•	226 – 300 Days: 1.25% Benefit</Text>
            <Text style={styles.head}>Key Features</Text>
            <Text style={styles.body}>•	Investment: Start with as little as ₹100. Save any amount, any time.</Text>
            <Text style={styles.body}>•	Age limit: Anyone above 18 years of age is allowed to join. </Text>
            <Text style={styles.body}>•	Duration: The tenure is 330 days from the date of the first instalment. You can save silver as many times as you wish during this period. Benefits apply from Day 1-300 within the 9%-1.25% slab as mentioned above. No benefits apply for day 301-330.The scheme matures on the 330th day.after the 330th day, Lock in period starts for 30 days.</Text>
            <Text style={styles.body}>•	Lock-in: No withdrawals allowed for the first 30 days. Scheme matures at the last day of lock-in.</Text>
            <Text style={styles.body}>•	Redemption: Must be converted to jewellery within 35 days of maturity. Taxes (GST), making charges, and wastage (VA) apply.</Text>
            <Text style={styles.body}>•	Verification: Only the registered user can redeem. Valid Govt ID (Aadhar, PAN, etc.) is mandatory.</Text>
            <Text style={styles.body}>•	Policy: No cash refunds under any circumstances.</Text>
            <Text style={styles.body}>•	Withdrawal / scheme closure before 330 days will result in forfeiture of accumulated weight and bonuses.</Text>
            <Text style={styles.body}>•	Disputes: All regulatory or benefit disputes are handled in-store and in-person only.</Text>
          </View>
        )}

        {/* ===== Kubera Virutcham TAMIL ===== */}
        {scheme === "kubrea" && lang === "ta" && (
          <View>
            <Text style={styles.title}>குபேர கடாட்சம் திட்டம் </Text>
            <Text style={styles.body}>குபேர கடாட்சம் திட்டம் என்பது 11 மாத கால முறையான சேமிப்பு திட்டமாகும். இது குறிப்பிடத்தக்க போனஸ் மற்றும் சலுகைகளுடன் தங்கம் சேமிக்க உங்களுக்கு உதவும் வகையில் வடிவமைக்கப்பட்டுள்ளது.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சே!ருவதற்கு</Text><Text style={styles.cell}>"Join Now" கிளிக்</Text><Text style={styles.cell}>மாதத் தவணையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>100% சேரும் போனஸை சரிபார்க்கவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>நகையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>முக்கிய அம்சங்கள் மற்றும் காலவரிசை</Text>
            <Text style={styles.body}>•	தகுதி: 18 வயது அல்லது அதற்கு மேற்பட்டவர்கள் சேரலாம்.</Text>
            <Text style={styles.body}>•	200% போனஸ்: தவணை காலம் முடிந்த பிறகு உங்கள் ஒரு மாத தவணைத் தொகையில் 200% போனஸைப் பெறுங்கள்.</Text>
            <Text style={styles.body}>      1000*11+11000+(1000*2=2000)=13000</Text>
            <Text style={styles.body}>      2000*11=22000+(2000*2=4000)=26000</Text>
            <Text style={styles.body}>•	முதிர்வு: இத்திட்டம் தொடங்கிய 330-வது நாளில் முதிர்வடையும்.</Text>
            <Text style={styles.body}>•	மீட்பு காலம்: முதிர்வுக்குப் பிறகு 30 நாட்கள் லாக்-இன் (Lock-in) காலம் உண்டு. லாக்-இன் காலம் முடிந்த பிறகு 35 நாட்களுக்குள் சேமிப்பை நகையாக மாற்ற வேண்டும்.</Text>            <Text style={styles.body}>•	தங்க விலை: தவணைகள் பண மதிப்பாகச் சேமிக்கப்படும்; நகையை மீட்கும் நாளில் நிலவும் சந்தை விலையில் தங்கம் கணக்கிடப்படும்.</Text>
            <Text style={styles.head}>பலன்கள் மற்றும் சேமிப்பு</Text>
            <Text style={styles.body}>•	0% செய்கூலி: செய்கூலியில் (Making Charges) 100% தள்ளுபடி உண்டு (சேதாரம்/Wastage பொருந்தும்).</Text>
            <Text style={styles.body}>•	பாதுகாப்பு: ஆன்லைன் மூலம் சேருபவர்கள் OTP முறை மூலம் பாதுகாப்பாகப் பயன்படுத்தலாம் (புத்தகம் தேவையில்லை). நேரடி உறுப்பினர்களுக்கு சேமிப்பு புத்தகம் வழங்கப்படும்</Text>
            <Text style={styles.head}>முக்கிய நிபந்தனைகள்</Text>
            <Text style={styles.body}>•	ரொக்கத் திரும்பப் பெற முடியாது: சேமிப்பை தங்க நகையாக மட்டுமே மீட்க முடியும்; எக்காரணம் கொண்டும் பணம் திரும்ப வழங்கப்படமாட்டாது.</Text>
            <Text style={styles.body}>•	கூடுதல் கட்டணங்கள்: சேதாரம் (Wastage), ஜிஎஸ்டி (GST) மற்றும் ஹால்மார்க் கட்டணங்களை வாடிக்கையாளர் செலுத்த வேண்டும்.</Text>
            <Text style={styles.body}>•	முன்கூட்டியே முடித்தல்: 330 நாட்களுக்கு முன்பே திட்டத்தை முடித்தால், வழங்கப்பட்ட போனஸ் சலுகைகள் அனைத்தும் ரத்து செய்யப்படும்.</Text>
            <Text style={styles.body}>•	தீர்வுகள்: திட்டம் தொடர்பான புகார்கள் அல்லது சந்தேகங்கள் கடையில் நேரில் மட்டுமே தீர்க்கப்படும்.</Text>
          </View>
        )}

        {/* ===== DIGISILVER ENGLISH ===== */}
        {scheme === "kubrea" && lang === "en" && (
          <View>
            <Text style={styles.title}>Kubera Kadaksham Scheme Details</Text>
            <Text style={styles.body}>The Kubera Kadaksham scheme is a systematic 11-month savings plan designed to help you accumulate gold with significant bonuses and rewards.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Click "Join Now"</Text><Text style={styles.cell}>Select monthly installment</Text><Text style={styles.cell}>Verify 100% Joining Bonus</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Choose your jewellery</Text><Text style={styles.cell}>Submit OTP to collect</Text></View>
            </View>
            <Text style={styles.head}>Key Features & Timeline</Text>
            <Text style={styles.body}>•	Eligibility: Must be 18 years or older.</Text>
            <Text style={styles.body}>•	200% bonus: Enjoy a 200% bonus on your instalment amount after chit completion, ie </Text>
            <Text style={styles.body}>      1000*11+11000+(1000*2=2000)=13000</Text>
            <Text style={styles.body}>      2000*11=22000+(2000*2=4000)=26000</Text>
            <Text style={styles.body}>•	Maturity: The scheme matures on the 330th day.</Text>
            <Text style={styles.body}>•	Lock-in & Redemption: There is a 30-day lock-in period post-maturity. You must redeem your savings for jewellery within 35 days after the lock-in period ends.</Text>
            <Text style={styles.body}>•	Gold Rate: Installments are saved as cash value; gold is purchased at the prevailing market rate on the day of redemption.</Text>
            <Text style={styles.head}>Benefits & Savings</Text>
            <Text style={styles.body}>•	0% Making Charges: Enjoy a 100% discount on Making Charges (Wastage charges still apply).</Text>
            <Text style={styles.body}>•	Security: Digital members use an OTP system (no passbook needed), while in-store members use a physical passbook.</Text>
            <Text style={styles.head}>Important Terms</Text>
            <Text style={styles.body}>•	No Cash Refunds: Savings can only be redeemed as gold jewellery; cash refunds are not permitted.</Text>
            <Text style={styles.body}>•	Additional Costs: Customers are responsible for Wastage, GST, and Hallmark charges.</Text>
            <Text style={styles.body}>•	Early Closure: Withdrawing before 330 days will result in the forfeiture of all bonuses.</Text>
            <Text style={styles.body}>•	Disputes: All disputes regarding regulations or benefits will be handled in-person at the store only.</Text>
          </View>
        )}

        {/* ===== Kubera Virutcham TAMIL ===== */}
        {scheme === "TV" && lang === "ta" && (
          <View>
            <Text style={styles.title}>தங்க விருட்சம் திட்டம்</Text>
            <Text style={styles.body}>G.S. தங்க மாளிகையின் 'தங்க விருட்சம்' திட்டம் என்பது 15 மாத (450 நாட்கள்) கால முறையான தங்கம் சேமிப்பு திட்டமாகும். இது தங்க விலை உயர்விலிருந்து உங்கள் முதலீட்டைப் பாதுகாப்பதோடு, நகை வாங்கும்போது செய்கூலி மற்றும் சேதாரம் இல்லாமல் அதிகப்படியான லாபத்தை வழங்குகிறது.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சேருவதற்கு</Text><Text style={styles.cell}>"Join Now" கிளிக்</Text><Text style={styles.cell}>மாதத் தவணையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>e-passbook-இல் தங்க எடையைச் சரிபார்க்கவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>நகையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>முக்கிய அம்சங்கள்</Text>
             <Text style={styles.body}>•	தகுதி: 18 வயது அல்லது அதற்கு மேற்பட்டவர்கள் சேரலாம்.</Text>
             <Text style={styles.body}>•	தவணைகள்: 15 மாத நிலையான தவணைகள் (குறைந்தபட்சம்: ₹1,000 | அதிகபட்சம்: ₹10,000 | ₹500-ன் மடங்குகளில்). ஆரம்ப தவணை தொகையை மாற்ற முடியாது.</Text>
             <Text style={styles.body}>•	தங்கம் சேமிப்பு: நீங்கள் செலுத்தும் ஒவ்வொரு தவணையும், அன்றைய சந்தை விலையின் அடிப்படையில் உடனடியாக 22-காரட் தங்க எடையாக மாற்றப்பட்டு உங்கள் கணக்கில் சேர்க்கப்படும்.</Text>
             <Text style={styles.body}>•	காலவரிசை: இத்திட்டம் தொடங்கிய 450-வது நாளில் முதிர்வடையும். அதனைத் தொடர்ந்து 30 நாட்கள் லாக்-இன் (Lock-in) காலம் உண்டு. லாக்-இன் காலம் முடிந்த பிறகு 35 நாட்களுக்குள் நகையை மீட்க வேண்டும்.</Text>
             <Text style={styles.body}>•	விலை பாதுகாப்பு: பணம் செலுத்தும் போதே தங்கம் ஒதுக்கப்படுவதால், எதிர்கால விலை ஏற்றத்திலிருந்து உங்கள் சேமிப்பு பாதுகாக்கப்படுகிறது.</Text>
             <Text style={styles.head}>பலன்கள் மற்றும் நிபந்தனைகள்</Text>
             <Text style={styles.body}>•	100% தள்ளுபடி: உங்கள் தங்க நகைகளுக்கு 0% செய்கூலி (Making Charges) மற்றும் 0% சேதாரம் (Wastage/VA) சலுகை உண்டு.</Text>
             <Text style={styles.body}>•	பாதுகாப்பு: ஆன்லைன் உறுப்பினர்கள் OTP மூலம் நகையை மீட்கலாம்; புத்தகம் வைத்திருப்பவர்கள் மீட்பின் போது அதைச் சமர்ப்பிக்க வேண்டும்.</Text>
             <Text style={styles.body}>•	ரொக்கத் திரும்பப் பெற முடியாது: அனைத்து தவணைகளும் நகையாக மட்டுமே மீட்கப்படும்; பணம் திரும்ப வழங்கப்படமாட்டாது.</Text>
             <Text style={styles.body}>•	முன்கூட்டியே முடித்தல்: 450 நாட்களுக்கு முன்பே திட்டத்தை முடித்தால், சலுகைகள் அனைத்தும் ரத்து செய்யப்படும் மற்றும் ரத்து கட்டணம் (Cancellation fee) வசூலிக்கப்படலாம்.</Text>
             <Text style={styles.body}>•	கூடுதல் கட்டணங்கள்: ஜிஎஸ்டி (GST), ஹால்மார்க் மற்றும் கற்களுக்கான கட்டணங்களை வாடிக்கையாளர் செலுத்த வேண்டும்.</Text>
             <Text style={styles.body}>•	சலுகைகள் பொருந்தும்: 15 மாத காலத்தையும் முழுமையாக முடிப்பவர்களுக்கு மட்டுமே இத்திட்டத்தின் பலன்கள் கிடைக்கும்.</Text>
             <Text style={styles.body}>•	தீர்வுகள்: திட்டம் தொடர்பான புகார்கள் அல்லது சந்தேகங்கள் கடையில் நேரில் மட்டுமே தீர்க்கப்படும்.</Text>            
          </View>
        )}

        {/* ===== DIGISILVER ENGLISH ===== */}
        {scheme === "TV" && lang === "en" && (
          <View>
            <Text style={styles.title}>Thanga Viruksham Scheme Details</Text>
            <Text style={styles.body}>The 'Thanga Viruksham' scheme by RKP Jewellery is a 15-month (450-day) systematic gold savings plan designed to protect your investment from price hikes while offering maximum savings and 0% wastages and making charges on jewellery purchases.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Click "Join Now"</Text><Text style={styles.cell}>Select monthly installment</Text><Text style={styles.cell}>Verify gold weight in e-passbook</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Choose your jewellery</Text><Text style={styles.cell}>Submit OTP to collect</Text></View>
            </View>
              <Text style={styles.head}>Key Features</Text>
              <Text style={styles.body}>•	Eligibility: Open to individuals aged 18+.</Text>
              <Text style={styles.body}>•	Installments: 15 fixed monthly payments (Min: ₹1,000 | Max: ₹10,000 | Multiples of ₹500). The initial amount cannot be altered.</Text>
              <Text style={styles.body}>•	Gold Accumulation: Each payment is instantly converted into 22-karat gold weight based on that day’s market rate.</Text>
              <Text style={styles.body}>•	Timeline: Matures on the 450th day, followed by a 30-day lock-in. Redemption must be completed within 35 days after the lock-in ends.</Text>
              <Text style={styles.body}>•	Price Protection: Since gold is credited at the time of payment, your savings are shielded from future price increases.</Text>
              <Text style={styles.head}>Benefits & Rules</Text>
              <Text style={styles.body}>•	100% Discount: Enjoy Zero Making Charges and Zero Wastage (VA) on your jewellery.</Text>
              <Text style={styles.body}>•	Security: Digital members redeem via OTP; physical passbook holders must surrender the book at redemption.</Text>
              <Text style={styles.body}>•	No Cash Refunds: All installments must be redeemed as jewellery; no cash refunds are permitted.</Text>
              <Text style={styles.body}>•	Early Termination: Closing the scheme before 450 days voids all benefits and may incur a cancellation fee.</Text>
              <Text style={styles.body}>•	Additional Costs: Customers are responsible for GST, Hallmark, and stone charges.</Text>
              <Text style={styles.body}>•	Benefits apply: Customers are required to finish the tenure of 15 months for the benefits to apply. Withdrawing early means forfeiture of said benefits.</Text>
              <Text style={styles.body}>•	Disputes: All regulatory or benefit disputes are handled in-store and in-person only.</Text>
          </View>
        )}

        {/* ===== JewelPlus TAMIL ===== */}
        {scheme === "JewelPlus" && lang === "ta" && (
          <View>
            <Text style={styles.title}>ஜூவல் பிளஸ் திட்டம் (Jewel Plus Plan) </Text>
            <Text style={styles.body}>G.S. தங்க மாளிகையின் 'ஜூவல் பிளஸ் திட்டம்' என்பது ஒரு சிறப்பு பரிமாற்றத் திட்டமாகும் (Exchange Scheme). இது உங்கள் பழைய தங்கம் அல்லது வெள்ளியை, செய்கூலி இல்லாமல் அதிக மதிப்பிலான புதிய ஹால்மார்க் நகைகளாக மாற்றிக்கொள்ள உதவுகிறது.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சேருவதற்கு</Text><Text style={styles.cell}>நேரில் ஷோரூமிற்கு வரவும்</Text><Text style={styles.cell}>பழைய நகைகளை தரப் பரிசோதனைக்குச் சமர்ப்பிக்கவும்</Text><Text style={styles.cell}>உங்கள் வைப்புப் பத்திரத்தைப் (Deposit Bond) பெற்றுக்கொள்ளவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>உங்களுக்குப் பிடித்த புதிய நகையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>முக்கிய அம்சங்கள்</Text>
            <Text style={styles.body}>•	குறைந்தபட்ச அளவு: 4 கிராம் (22k) தங்கம் அல்லது 100 கிராம் வெள்ளி.</Text>
            <Text style={styles.body}>•	தர மதிப்பீடு: * தங்கம்: 22 காரட்டிற்கு குறைவான நகைகள் 'காரட் மீட்டர்' மூலம் பரிசோதிக்கப்பட்டு, அதற்கு இணையான 22 காரட் எடையாக உங்கள் கணக்கில் சேர்க்கப்படும்.</Text>
            <Text style={styles.body}>o	வெள்ளி: பழைய வெள்ளிப் பொருட்கள் அதன் எடையில் 75% ஆகக் கணக்கிடப்படும் (வெள்ளி கட்டிகள்/நாணயங்கள் தவிர).</Text>
            <Text style={styles.body}>•	கால அளவு: இத்திட்டம் 11 மாதங்களில் (330 நாட்கள்) முதிர்வடையும், அதனைத் தொடர்ந்து 30 நாட்கள் லாக்-இன் (Lock-in) காலம் உண்டு.</Text>
            <Text style={styles.body}>•	ஒருமுறை முதலீடு: ஏற்கனவே உள்ள கணக்கில் கூடுதல் எடையைச் சேர்க்க முடியாது, ஆனால் நீங்கள் ஒரே நேரத்தில் பல கணக்குகளைத் தொடங்கலாம்.</Text>
            <Text style={styles.head}>பலன்கள்</Text>
            <Text style={styles.body}>•	0% கட்டணங்கள்: செய்கூலி (Making Charges) மற்றும் சேதாரம் (VA) ஆகியவற்றில் 100% தள்ளுபடி உண்டு.</Text>
            <Text style={styles.body}>•	நெகிழ்வான தேர்வு: நீங்கள் தேர்ந்தெடுக்கும் புதிய நகை, சேமித்த எடையை விட அதிகமாக இருந்தால், அந்த கூடுதல் எடைக்கு மட்டும் வழக்கமான செய்கூலி மற்றும் சேதாரம் வசூலிக்கப்படும்.</Text>
            <Text style={styles.body}>•	பழையதற்குப் பதில் புதியது: உங்கள் கணக்கில் உள்ள எடைக்கு இணையான புதிய 22 காரட் ஹால்மார்க் நகைகள் அல்லது வெள்ளிப் பொருட்களைப் பெறலாம்.</Text>
            <Text style={styles.head}>முக்கிய நிபந்தனைகள்</Text>
            <Text style={styles.body}>•	தகுதி மற்றும் அடையாளம்: 18 வயது அல்லது அதற்கு மேற்பட்டவர்கள் சேரலாம். அடையாளச் சான்று மற்றும் தொடர்பு எண் அவசியம்.</Text>
            <Text style={styles.body}>•	பணம்/பழைய நகை திரும்பப் பெற முடியாது: சேமிப்பை நகையாக மட்டுமே மீட்க முடியும். எக்காரணம் கொண்டும் பணம் திரும்ப வழங்கப்படமாட்டாது அல்லது சமர்ப்பித்த பழைய நகைகள் திருப்பித் தரப்படமாட்டாது.</Text>
            <Text style={styles.body}>•	முன்கூட்டியே வெளியேறுதல்: 330 நாட்களுக்கு முன் திட்டத்தை முடித்தால், பழைய நகைகள் திரும்பத் தரப்படமாட்டாது. உங்கள் கணக்கில் உள்ள எடைக்கு புதிய நகைகளை வாங்கிக்கொள்ளலாம், ஆனால் அதற்குரிய செய்கூலி மற்றும் சேதாரத்தை நீங்கள் செலுத்த வேண்டும்.</Text>
            <Text style={styles.body}>•	கூடுதல் கட்டணங்கள்: ஜிஎஸ்டி (GST) மற்றும் இதர கட்டணங்களை வாடிக்கையாளர் செலுத்த வேண்டும்.</Text>
            <Text style={styles.body}>•	தீர்வுகள்: திட்டம் தொடர்பான புகார்கள் அல்லது சந்தேகங்கள் கடையில் நேரில் மட்டுமே தீர்க்கப்படும்.</Text>
            <Text style={styles.head}>முக்கிய குறிப்பு:</Text>
            <Text style={styles.body}>இத்திட்டம் நமது ஷோரூம்களில் மட்டுமே சேர இயலும். மொபைல் ஆப் மூலம் இணைய முடியாது. ஆனால், சேர்ந்த பிறகு உங்கள் டிஜிட்டல் பத்திரத்தை ஆப்-இல் பார்க்கலாம்.</Text>
          </View>
        )}

        {/* ===== JewelPlus ENGLISH ===== */}
        {scheme === "JewelPlus" && lang === "en" && (
          <View>
            <Text style={styles.title}>Jewel Plus Plan </Text>
            <Text style={styles.body}>The Jewel Plus Plan by RKP Jewellery is a specialized exchange scheme that allows you to turn your old gold or silver into new, hallmark jewellery with maximum value and zero making charges upon completion.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Visit our showroom in person</Text><Text style={styles.cell}>Submit old jewellery for purity testing</Text><Text style={styles.cell}>Receive your Deposit Bond</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Select your new jewellery</Text><Text style={styles.cell}>Submit OTP to collect</Text></View>
            </View>
              <Text style={styles.head}>Key Features</Text>
              <Text style={styles.body}>•	Minimum Entry: 4 grams of 22k Gold or 100 grams of Silver.</Text>
              <Text style={styles.body}>•	Purity Assessment: * Gold: Items below 22k are tested via Carat Meter and credited as equivalent 22k weight.</Text>
              <Text style={styles.body}>o	Silver: Old silver is credited at 75% of the deposited weight (excluding bars/coins).</Text>
              <Text style={styles.body}>•	Timeline: Matures in 11 months (330 days), followed by a 30-day lock-in.</Text>
              <Text style={styles.body}>•	One-Time Investment: You cannot add more weight to an existing account, but you are welcome to open multiple accounts simultaneously.</Text>
              <Text style={styles.head}>Benefits</Text>
              <Text style={styles.body}>•	Zero Charges: Enjoy a 100% Discount on both Making Charges and Wastage (VA).</Text>
              <Text style={styles.body}>•	Flexible Selection: If your new jewellery exceeds your saved weight, benefits apply to the saved portion; regular charges apply only to the extra weight.</Text>
              <Text style={styles.body}>•	New for Old: Receive brand new 22-karat Hallmark jewellery or silver articles equivalent to your credited weight.</Text>
              <Text style={styles.head}>Important Considerations</Text>
              <Text style={styles.body}>•	Eligibility & ID: Open to individuals aged 18+. Valid ID and contact number are mandatory.</Text>
              <Text style={styles.body}>•	No Cash/Original Returns: Savings are redeemable only as jewellery. Under no circumstances will cash be refunded or the original old jewellery be returned.</Text>
              <Text style={styles.body}>•	Early Withdrawal: If discontinued before 330 days, the original items are not returned. You may collect new jewellery for the credited weight but must pay prevailing making charges and wastage.</Text>
              <Text style={styles.body}>•	Additional Costs: Statutory GST and other applicable charges must be borne by the customer.</Text>
              <Text style={styles.body}>•	Disputes: All regulatory or benefit disputes are handled in-store and in-person only.</Text>
              <Text style={styles.head}>Note: </Text>
              <Text style={styles.body}>The Jewel Plus Plan is available exclusively at our showroom and is only enrolled physically. Enrollment is not available online or through the mobile application. For further details or to join the scheme, we kindly invite you to visit your nearest RKP Jewellery showroom.</Text>
          </View>
        )}

        {/* ===== Ponmagal Gold TAMIL ===== */}
        {scheme === "PonGold" && lang === "ta" && (
          <View>
            <Text style={styles.title}>பொன்மகள் கோல்டு திட்டம்</Text>
            <Text style={styles.body}>G.S. தங்க மாளிகையின் 'பொன்மகள் கோல்டு   திட்டம்' என்பது ஒரு சிறந்த ஒருமுறை முதலீட்டுத் திட்டமாகும் (One-time Investment). இது மாதத் தவணைகளுக்குப் பதில், மொத்தமாக முதலீடு செய்ய விரும்புபவர்களுக்காக வடிவமைக்கப்பட்டுள்ளது. இத்திட்டம் உடனடி தங்க வரவு மற்றும் நகை வாங்கும் போது சிறப்பான சேமிப்பை வழங்குகிறது.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சேருவதற்கு</Text><Text style={styles.cell}>நேரில் ஷோரூமிற்கு வரவும்</Text><Text style={styles.cell}>குறைந்தபட்சம் ₹25,000 முதலீடு செய்யவும்</Text><Text style={styles.cell}>உங்கள் தங்க வைப்புப் பத்திரத்தைப் பெற்றுக்கொள்ளவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>உங்களுக்குப் பிடித்த புதிய நகையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>முக்கிய அம்சங்கள்</Text>
            <Text style={styles.body}>•	ஒருமுறை முதலீடு: குறைந்தபட்சம் ₹25,000. மாதத் தவணைகள் செலுத்த வேண்டிய அவசியமில்லை.</Text>
            <Text style={styles.body}>•	உடனடி வரவு: உங்கள் முதலீடு அன்றைய சந்தை விலையின் அடிப்படையில் உடனடியாக 22-காரட் தங்க எடையாக மாற்றப்படும். இதனால் எதிர்கால விலை ஏற்றத்திலிருந்து உங்கள் முதலீடு பாதுகாக்கப்படுகிறது.</Text>
            <Text style={styles.body}>•	கால அளவு: இத்திட்டம் தொடங்கிய 330-வது நாளில் முதிர்வடையும். அதனைத் தொடர்ந்து 30 நாட்கள் லாக்-இன் (Lock-in) காலம் உண்டு.</Text>
            <Text style={styles.body}>•	மீட்பு காலம்: லாக்-இன் காலம் முடிந்த பிறகு 35 நாட்களுக்குள் சேமிப்பை நகையாக மாற்ற வேண்டும்.</Text>
            <Text style={styles.head}>பலன்கள்</Text>
            <Text style={styles.body}>•	100% தள்ளுபடி: உங்கள் தங்க நகைகளுக்கு 0% செய்கூலி (Making Charges) மற்றும் 0% சேதாரம் (Wastage/VA) சலுகை உண்டு.</Text>
            <Text style={styles.body}>•	விலை பாதுகாப்பு: முதலீடு செய்யும் போதே தங்கத்தின் எடை உறுதி செய்யப்படுவதால், சந்தை விலை மாற்றங்களிலிருந்து உங்கள் முதலீடு பாதுகாக்கப்படுகிறது.</Text>
            <Text style={styles.body}>•	பரந்த தேர்வுகள்: முதிர்வின் போது தங்கம், வைரம் அல்லது வெள்ளி நகைகளின் பெரிய சேகரிப்பிலிருந்து நீங்கள் தேர்வு செய்யலாம்.</Text>
            <Text style={styles.head}>முக்கிய நிபந்தனைகள்</Text>
            <Text style={styles.body}>•	தகுதி மற்றும் அடையாளம்: 18 வயது அல்லது அதற்கு மேற்பட்டவர்கள் சேரலாம். நகையை மீட்கும் போது அரசு அங்கீகரித்த அடையாளச் சான்று (ஆதார் கார்டு போன்றவை) அவசியம்.</Text>
            <Text style={styles.body}>•	ரொக்கத் திரும்பப் பெற முடியாது: முதலீட்டை நகையாக மட்டுமே மீட்க முடியும்; பணம் திரும்ப வழங்கப்படமாட்டாது.</Text>
            <Text style={styles.body}>•	முன்கூட்டியே வெளியேறுதல்: முதல் 90 நாட்களுக்குள் திட்டத்திலிருந்து வெளியேற முடியாது. 90 நாட்களுக்குப் பிறகு ஆனால் 330 நாட்களுக்கு முன் வெளியேறினால், உங்கள் கணக்கில் உள்ள தங்க எடையைப் பெறலாம், ஆனால் திட்டத்தின் சிறப்புச் சலுகைகள் மற்றும் தள்ளுபடிகள் கிடைக்காது.</Text>
            <Text style={styles.body}>•	கூடுதல் கட்டணங்கள்: ஜிஎஸ்டி (GST) மற்றும் ஹால்மார்க் கட்டணங்களை வாடிக்கையாளர் செலுத்த வேண்டும்.</Text>
            <Text style={styles.body}>•	தீர்வுகள்: திட்டம் தொடர்பான புகார்கள் அல்லது சந்தேகங்கள் கடையில் நேரில் மட்டுமே தீர்க்கப்படும்.</Text>
            <Text style={styles.head}>முக்கிய குறிப்பு:</Text>
            <Text style={styles.body}> இத்திட்டம் நமது ஷோரூம்களில் மட்டுமே சேர இயலும். மொபைல் ஆப் மூலம் இணைய முடியாது. ஆனால், சேர்ந்த பிறகு உங்கள் டிஜிட்டல் பத்திரத்தை ஆப்-இல் பார்க்கலாம்.</Text>
          </View>
        )}

        {/* ===== JewelPlus ENGLISH ===== */}
        {scheme === "PonGold" && lang === "en" && (
          <View>
            <Text style={styles.title}>Ponmagal Gold Scheme</Text>
            <Text style={styles.body}>The 'Ponmagal Gold Scheme' by RKP Jewellery is a premier one-time investment plan. It is designed for those who prefer a lump-sum deposit over monthly installments, offering immediate gold credit and exceptional savings on final purchases.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Visit our showroom in person</Text><Text style={styles.cell}>Invest a minimum of ₹25,000</Text><Text style={styles.cell}>Receive your Deposit Bond</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Select your new jewellery</Text><Text style={styles.cell}>Submit OTP to collect</Text></View>
            </View>
              <Text style={styles.head}>Key Features</Text>
              <Text style={styles.body}>•	One-Time Investment: Minimum payment of ₹25,000. No monthly commitments.</Text>
              <Text style={styles.body}>•	Immediate Credit: Your investment is instantly converted into 22-karat gold weight at the day's prevailing rate, protecting you from future price hikes.</Text>
              <Text style={styles.body}>•	Duration: The scheme matures on the 330th day, followed by a 30-day lock-in period.</Text>
              <Text style={styles.body}>•	Redemption Window: You must convert your savings into jewellery within 35 days after the lock-in period ends.</Text>
              <Text style={styles.head}>Benefits</Text>
              <Text style={styles.body}>•	100% Discount: Enjoy Zero Making Charges and Zero Wastage (VA) on your gold jewellery.</Text>
              <Text style={styles.body}>•	Price Protection: Your gold weight is locked at the time of purchase, shielding your capital from market fluctuations.</Text>
              <Text style={styles.body}>•	Wide Selection: At maturity, you can choose from our extensive collection of gold, diamond, or silver jewellery.</Text>
              <Text style={styles.head}>Important Considerations</Text>
              <Text style={styles.body}>•	Eligibility & ID: Open to individuals aged 18+. A government-approved ID (like Aadhar) is mandatory for redemption.</Text>
              <Text style={styles.body}>•	No Cash Refunds: Investments are non-refundable as cash and can only be redeemed as jewellery.</Text>
              <Text style={styles.body}>•	Early Exit: You cannot exit within the first 90 days. If you withdraw after 90 days but before the 330-day maturity, you receive the accumulated gold weight but forfeit all special benefits and discounts.</Text>
              <Text style={styles.body}>•	Additional Costs: Customers are responsible for statutory GST and hallmarking charges.</Text>
              <Text style={styles.body}>•	In-Person Enrollment: This scheme is available exclusively at our showrooms. While you can view your digital bond on the app, enrollment must be done in person.</Text>
              <Text style={styles.body}>•	Disputes: All regulatory or benefit disputes are handled in-store and in-person only.</Text>
              <Text style={styles.head}>Note:</Text>
              <Text style={styles.body}>The Ponmagal Gold Scheme is available exclusively at our showrooms. Enrollment cannot be completed online or through the mobile app. However, once you have joined the scheme at the showroom, you may view your digital bond within the App. For further details or to enroll, we kindly invite you to visit your nearest RKP Jewellery showroom.</Text>
          </View>
        )}

        {/* ===== ponmagal SilverTAMIL ===== */}
        {scheme === "PonSilver" && lang === "ta" && (
          <View>
            <Text style={styles.title}>பொன்மகள் வெள்ளித் திட்டம்</Text>
            <Text style={styles.body}>G.S. தங்க மாளிகையின் 'பொன்மகள் வெள்ளித் திட்டம்' என்பது ஒரு சிறந்த ஒருமுறை முதலீட்டுத் திட்டமாகும் (One-time Investment). இது மாதத் தவணைகளுக்குப் பதில், மொத்தமாக முதலீடு செய்ய விரும்புபவர்களுக்காக வடிவமைக்கப்பட்டுள்ளது. இத்திட்டம் உடனடி வெள்ளி வரவு மற்றும் வெள்ளிப் பொருட்கள் வாங்கும் போது சிறப்பான சேமிப்பை வழங்குகிறது.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சேருவதற்கு</Text><Text style={styles.cell}>நேரில் ஷோரூமிற்கு வரவும்</Text><Text style={styles.cell}>குறைந்தபட்சம் ₹10,000 முதலீடு செய்யவும்</Text><Text style={styles.cell}>உங்கள் வெள்ளி வைப்புப் பத்திரத்தைப் பெற்றுக்கொள்ளவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>உங்களுக்குப் பிடித்த வெள்ளிப் பொருட்களைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>முக்கிய அம்சங்கள்</Text>
            <Text style={styles.body}>•	ஒருமுறை முதலீடு: குறைந்தபட்சம் ₹10,000. மாதத் தவணைகள் செலுத்த வேண்டிய அவசியமில்லை.</Text>
            <Text style={styles.body}>•	உடனடி வரவு: உங்கள் முதலீடு அன்றைய சந்தை விலையின் அடிப்படையில் உடனடியாக வெள்ளி எடையாக மாற்றப்படும். இதனால் எதிர்கால விலை ஏற்றத்திலிருந்து உங்கள் முதலீடு பாதுகாக்கப்படுகிறது.</Text>
            <Text style={styles.body}>•	கால அளவு: இத்திட்டம் தொடங்கிய 330-வது நாளில் முதிர்வடையும். அதனைத் தொடர்ந்து 30 நாட்கள் லாக்-இன் (Lock-in) காலம் உண்டு.</Text>
            <Text style={styles.body}>•	மீட்பு காலம்: லாக்-இன் காலம் முடிந்த பிறகு 35 நாட்களுக்குள் சேமிப்பை நகையாக மாற்ற வேண்டும்.</Text>
            <Text style={styles.head}>பலன்கள்</Text>
            <Text style={styles.body}>•	100% தள்ளுபடி: உங்கள் வெள்ளி நகைகளுக்கு 0% செய்கூலி (Making Charges) மற்றும் 0% சேதாரம் (Wastage/VA) சலுகை உண்டு.</Text>
            <Text style={styles.body}>•	விலை பாதுகாப்பு: முதலீடு செய்யும் போதே தங்கத்தின் எடை உறுதி செய்யப்படுவதால், சந்தை விலை மாற்றங்களிலிருந்து உங்கள் முதலீடு பாதுகாக்கப்படுகிறது.</Text>
            <Text style={styles.body}>•	பரந்த தேர்வுகள்: முதிர்வின் போது வெள்ளி நகைகள், பாத்திரங்கள் அல்லது பரிசுப் பொருட்களின் பெரிய சேகரிப்பிலிருந்து நீங்கள் தேர்வு செய்யலாம்.</Text>
            <Text style={styles.head}>முக்கிய நிபந்தனைகள்</Text>
            <Text style={styles.body}>•	தகுதி மற்றும் அடையாளம்: 18 வயது அல்லது அதற்கு மேற்பட்டவர்கள் சேரலாம். நகையை மீட்கும் போது அரசு அங்கீகரித்த அடையாளச் சான்று (ஆதார் கார்டு போன்றவை) அவசியம்.</Text>
            <Text style={styles.body}>•	ரொக்கத் திரும்பப் பெற முடியாது: முதலீட்டை நகையாக மட்டுமே மீட்க முடியும்; பணம் திரும்ப வழங்கப்படமாட்டாது.</Text>
            <Text style={styles.body}>•	முன்கூட்டியே வெளியேறுதல்: முதல் 90 நாட்களுக்குள் திட்டத்திலிருந்து வெளியேற முடியாது. 90 நாட்களுக்குப் பிறகு ஆனால் 330 நாட்களுக்கு முன் வெளியேறினால், உங்கள் கணக்கில் உள்ள வெள்ளி எடையைப் பெறலாம், ஆனால் திட்டத்தின் சிறப்புச் சலுகைகள் மற்றும் தள்ளுபடிகள் கிடைக்காது.</Text>
            <Text style={styles.body}>•	கூடுதல் கட்டணங்கள்: ஜிஎஸ்டி (GST) மற்றும் ஹால்மார்க் கட்டணங்களை வாடிக்கையாளர் செலுத்த வேண்டும்.</Text>
            <Text style={styles.body}>•	தீர்வுகள்: திட்டம் தொடர்பான புகார்கள் அல்லது சந்தேகங்கள் கடையில் நேரில் மட்டுமே தீர்க்கப்படும்.</Text>
            <Text style={styles.head}>முக்கிய குறிப்பு:</Text>
            <Text style={styles.body}> இத்திட்டம் நமது ஷோரூம்களில் மட்டுமே சேர இயலும். மொபைல் ஆப் மூலம் இணைய முடியாது. ஆனால், சேர்ந்த பிறகு உங்கள் டிஜிட்டல் பத்திரத்தை ஆப்-இல் பார்க்கலாம்.</Text>
          </View>
        )}

        {/* ===== ponmagal Silver ENGLISH ===== */}
        {scheme === "PonSilver" && lang === "en" && (
          <View>
            <Text style={styles.title}>Ponmagal Silver Scheme </Text>
            <Text style={styles.body}>The 'Ponmagal Silver Scheme' by RKP Jewellery is a premier one-time investment plan. It is designed for those who prefer a lump-sum deposit over monthly installments, offering immediate silver credit and exceptional savings on final purchases.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Visit our showroom in person</Text><Text style={styles.cell}>Invest a minimum of ₹10,000</Text><Text style={styles.cell}>Receive your Deposit Bond</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Select your favorite silver items</Text><Text style={styles.cell}>Submit OTP to collect</Text></View>
            </View>
              <Text style={styles.head}>Key Features</Text>
              <Text style={styles.body}>•	One-Time Investment: Minimum payment of ₹10,000. No monthly commitments.</Text>
              <Text style={styles.body}>•	Immediate Credit: Your investment is instantly converted into Silver weight at the day's prevailing rate, protecting you from future price hikes.</Text>
              <Text style={styles.body}>•	Duration: The scheme matures on the 330th day, followed by a 30-day lock-in period.</Text>
              <Text style={styles.body}>•	Redemption Window: You must convert your savings into silver jewellery or articles within 35 days after the lock-in period ends.</Text>
              <Text style={styles.head}>Benefits</Text>
              <Text style={styles.body}>•	100% Discount: Enjoy Zero Making Charges and Zero Wastage (VA) on your Silver jewellery.</Text>
              <Text style={styles.body}>•	Price Protection: Your Silver weight is locked at the time of purchase, shielding your capital from market fluctuations.</Text>
              <Text style={styles.body}>•	Wide Selection: At maturity, you can choose from our extensive collection of silver jewellery, utensils, or gift articles.</Text>
              <Text style={styles.head}>Important Considerations</Text>
              <Text style={styles.body}>•	Eligibility & ID: Open to individuals aged 18+. A government-approved ID (like Aadhar) is mandatory for redemption.</Text>
              <Text style={styles.body}>•	No Cash Refunds: Investments are non-refundable as cash and can only be redeemed as jewellery.</Text>
              <Text style={styles.body}>•	Early Exit: You cannot exit within the first 90 days. If you withdraw after 90 days but before the 330-day maturity, you receive the accumulated Silver weight but forfeit all special benefits and discounts.</Text>
              <Text style={styles.body}>•	Additional Costs: Customers are responsible for statutory GST and hallmarking charges.</Text>
              <Text style={styles.body}>•	In-Person Enrollment: This scheme is available exclusively at our showrooms. While you can view your digital bond on the app, enrollment must be done in person.</Text>
              <Text style={styles.body}>•	Disputes: All regulatory or benefit disputes are handled in-store and in-person only.</Text>
              <Text style={styles.head}>Note:</Text>
              <Text style={styles.body}>The Ponmagal Silver Scheme is available exclusively at our showrooms. Enrollment cannot be completed online or through the mobile app. However, once you have joined the scheme at the showroom, you may view your digital bond within the App. For further details or to enroll, we kindly invite you to visit your nearest RKP Jewellery showroom.</Text>
          </View>
        )}

        {parseInt(schemeId) > 0 && (
          <Button
            mode="contained"
            style={styles.btn}
            textColor="#fff"
            onPress={() => navigation.navigate("NewScheme", { mobile, schemeid: schemeId })}>
            Proceed
          </Button>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 30,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    gap: 15,
  },
  langBtn: {
    fontSize: 15,
    color: "#6e0501",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#6e0501",
    borderRadius: 20,
  },
  langBtnActive: {
    backgroundColor: "#6e0501",
    color: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6e0501",
    marginBottom: 10,
  },
  head: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
    marginBottom: 4,
  },
  body: {
    fontSize: 13,
    color: "#444",
    marginBottom: 5,
    lineHeight: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 6,
    fontSize: 10,
    color: "#333",
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#f0e0e0",
    color: "#6e0501",
  },
  btn: {
    backgroundColor: "#6e0501",
    marginTop: 25,
    borderRadius: 8,
  },
});
