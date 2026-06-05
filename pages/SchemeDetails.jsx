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

        {/* ===== Aishwarya Lakshmi TAMIL ===== */}
        {scheme === "aishwaryam" && lang === "ta" && (
          <View>
            <Text style={styles.title}>ஐஸ்வர்யா லட்சுமி திட்டம் </Text>
            <Text style={styles.body}>ஐஸ்வர்யா லட்சுமி திட்டம் என்பது 11 மாத கால முறையான சேமிப்பு திட்டமாகும். இது குறிப்பிடத்தக்க போனஸ் மற்றும் சலுகைகளுடன் தங்கம் சேமிக்க உங்களுக்கு உதவும் வகையில் வடிவமைக்கப்பட்டுள்ளது.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சே!ருவதற்கு</Text><Text style={styles.cell}>"Join Now" கிளிக்</Text><Text style={styles.cell}>மாதத் தவணையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>100% சேரும் போனஸை சரிபார்க்கவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>நகையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>முக்கிய அம்சங்கள் மற்றும் காலவரிசை</Text>
            <Text style={styles.body}>•	தகுதி: 18 வயது அல்லது அதற்கு மேற்பட்டவர்கள் சேரலாம்.</Text>
            <Text style={styles.body}>•	200% போனஸ்: தவணை காலம் முடிந்த பிறகு உங்கள் ஒரு மாத தவணைத் தொகையில் 200% போனஸைப் பெறுங்கள்.</Text>
            <Text style={styles.body}>      1000*11=11000+(1000*1=1000)=12000</Text>
            <Text style={styles.body}>      2000*11=22000+(2000*1=2000)=24000</Text>
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

        {/* ===== Aishwarya Lakshmi ENGLISH ===== */}
        {scheme === "aishwaryam" && lang === "en" && (
          <View>
            <Text style={styles.title}>Aishwarya Lakshmi Scheme Details</Text>
            <Text style={styles.body}>The Aishwarya Lakshmi scheme is a systematic 11-month savings plan designed to help you accumulate gold with significant bonuses and rewards.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Click "Join Now"</Text><Text style={styles.cell}>Select monthly installment</Text><Text style={styles.cell}>Verify 100% Joining Bonus</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Choose your jewellery</Text><Text style={styles.cell}>Submit OTP to collect</Text></View>
            </View>
            <Text style={styles.head}>Key Features & Timeline</Text>
            <Text style={styles.body}>•	Eligibility: Must be 18 years or older.</Text>
            <Text style={styles.body}>•	200% bonus: Enjoy a 200% bonus on your instalment amount after chit completion, ie </Text>
            <Text style={styles.body}>      1000*11=11000+(1000*1=1000)=12000</Text>
            <Text style={styles.body}>      2000*11=22000+(2000*1=2000)=24000</Text>
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

        {/* ===== Swarna Lakshmi TAMIL ===== */}
        {scheme === "swarna" && lang === "ta" && (
          <View>
            <Text style={styles.title}>ஸ்வர்ணலட்சுமி திட்டம்</Text>
            <Text style={styles.body}>ஸ்வர்ணலட்சுமி திட்டம் என்பது 11 மாத (330 நாட்கள்) கால முறையான தங்கம் சேமிப்பு திட்டமாகும். இது தங்க விலை உயர்விலிருந்து உங்கள் முதலீட்டைப் பாதுகாப்பதோடு, நகை வாங்கும்போது செய்கூலி மற்றும் சேதாரம் இல்லாமல் அதிகப்படியான லாபத்தை வழங்குகிறது.</Text>
            <Text style={styles.head}>சேரும் முறை மற்றும் மீட்பு முறை</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>வழிமுறை</Text><Text style={[styles.cell, styles.header]}>நிலை 1</Text><Text style={[styles.cell, styles.header]}>நிலை 2</Text><Text style={[styles.cell, styles.header]}>நிலை 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>சேருவதற்கு</Text><Text style={styles.cell}>"Join Now" கிளிக்</Text><Text style={styles.cell}>மாதத் தவணையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>e-passbook-இல் தங்க எடையைச் சரிபார்க்கவும்</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>மீட்பதற்கு</Text><Text style={styles.cell}>ஷோரூம் வரவும்</Text><Text style={styles.cell}>நகையைத் தேர்வு செய்யவும்</Text><Text style={styles.cell}>OTP சமர்ப்பித்து பெற்றுக்கொள்ளவும்</Text></View>
            </View>
            <Text style={styles.head}>முக்கிய அம்சங்கள்</Text>
             <Text style={styles.body}>•	தகுதி: 18 வயது அல்லது அதற்கு மேற்பட்டவர்கள் சேரலாம்.</Text>
             <Text style={styles.body}>•	தவணைகள்: 11 மாத நிலையான தவணைகள் (குறைந்தபட்சம்: ₹2,000 | அதிகபட்சம்: ₹25,000 | ₹1000-ன் மடங்குகளில்). ஆரம்ப தவணை தொகையை மாற்ற முடியாது.</Text>
             <Text style={styles.body}>•	தங்கம் சேமிப்பு: நீங்கள் செலுத்தும் ஒவ்வொரு தவணையும், அன்றைய சந்தை விலையின் அடிப்படையில் உடனடியாக 22-காரட் தங்க எடையாக மாற்றப்பட்டு உங்கள் கணக்கில் சேர்க்கப்படும்.</Text>
             <Text style={styles.body}>•	காலவரிசை: இத்திட்டம் தொடங்கிய 330-வது நாளில் முதிர்வடையும். அதனைத் தொடர்ந்து 30 நாட்கள் லாக்-இன் (Lock-in) காலம் உண்டு. லாக்-இன் காலம் முடிந்த பிறகு 35 நாட்களுக்குள் நகையை மீட்க வேண்டும்.</Text>
             <Text style={styles.body}>•	விலை பாதுகாப்பு: பணம் செலுத்தும் போதே தங்கம் ஒதுக்கப்படுவதால், எதிர்கால விலை ஏற்றத்திலிருந்து உங்கள் சேமிப்பு பாதுகாக்கப்படுகிறது.</Text>
             <Text style={styles.head}>பலன்கள் மற்றும் நிபந்தனைகள்</Text>
             <Text style={styles.body}>•	100% தள்ளுபடி: உங்கள் தங்க நகைகளுக்கு 0% செய்கூலி (Making Charges) மற்றும் 0% சேதாரம் (Wastage/VA) சலுகை உண்டு.</Text>
             <Text style={styles.body}>•	பாதுகாப்பு: ஆன்லைன் உறுப்பினர்கள் OTP மூலம் நகையை மீட்கலாம்; புத்தகம் வைத்திருப்பவர்கள் மீட்பின் போது அதைச் சமர்ப்பிக்க வேண்டும்.</Text>
             <Text style={styles.body}>•	ரொக்கத் திரும்பப் பெற முடியாது: அனைத்து தவணைகளும் நகையாக மட்டுமே மீட்கப்படும்; பணம் திரும்ப வழங்கப்படமாட்டாது.</Text>
             <Text style={styles.body}>•	முன்கூட்டியே முடித்தல்: 330 நாட்களுக்கு முன்பே திட்டத்தை முடித்தால், சலுகைகள் அனைத்தும் ரத்து செய்யப்படும் மற்றும் ரத்து கட்டணம் (Cancellation fee) வசூலிக்கப்படலாம்.</Text>
             <Text style={styles.body}>•	கூடுதல் கட்டணங்கள்: ஜிஎஸ்டி (GST), ஹால்மார்க் மற்றும் கற்களுக்கான கட்டணங்களை வாடிக்கையாளர் செலுத்த வேண்டும்.</Text>
             <Text style={styles.body}>•	சலுகைகள் பொருந்தும்: 11 மாத காலத்தையும் முழுமையாக முடிப்பவர்களுக்கு மட்டுமே இத்திட்டத்தின் பலன்கள் கிடைக்கும்.</Text>
             <Text style={styles.body}>•	தீர்வுகள்: திட்டம் தொடர்பான புகார்கள் அல்லது சந்தேகங்கள் கடையில் நேரில் மட்டுமே தீர்க்கப்படும்.</Text>            
          </View>
        )}

        {/* ===== Swarna Lakshmi ENGLISH ===== */}
        {scheme === "swarna" && lang === "en" && (
          <View>
            <Text style={styles.title}>Swarna Lakshmi Scheme Details</Text>
            <Text style={styles.body}>The Swarna Lakshmi scheme by RKP Jewellery is a 11-month (330-day) systematic gold savings plan designed to protect your investment from price hikes while offering maximum savings and 0% wastages and making charges on jewellery purchases.</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}><Text style={[styles.cell, styles.header]}>PROCESS</Text><Text style={[styles.cell, styles.header]}>STEP 1</Text><Text style={[styles.cell, styles.header]}>STEP 2</Text><Text style={[styles.cell, styles.header]}>STEP 3</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO JOIN</Text><Text style={styles.cell}>Click "Join Now"</Text><Text style={styles.cell}>Select monthly installment</Text><Text style={styles.cell}>Verify gold weight in e-passbook</Text></View>
              <View style={styles.tableRow}><Text style={styles.cell}>TO REDEEM</Text><Text style={styles.cell}>Visit showroom</Text><Text style={styles.cell}>Choose your jewellery</Text><Text style={styles.cell}>Submit OTP to collect</Text></View>
            </View>
              <Text style={styles.head}>Key Features</Text>
              <Text style={styles.body}>•	Eligibility: Open to individuals aged 18+.</Text>
              <Text style={styles.body}>•	Installments: 11 fixed monthly payments (Min: ₹2,000 | Max: ₹25,000 | Multiples of ₹1,000). The initial amount cannot be altered.</Text>
              <Text style={styles.body}>•	Gold Accumulation: Each payment is instantly converted into 22-karat gold weight based on that day’s market rate.</Text>
              <Text style={styles.body}>•	Timeline: Matures on the 330th day, followed by a 30-day lock-in. Redemption must be completed within 35 days after the lock-in ends.</Text>
              <Text style={styles.body}>•	Price Protection: Since gold is credited at the time of payment, your savings are shielded from future price increases.</Text>
              <Text style={styles.head}>Benefits & Rules</Text>
              <Text style={styles.body}>•	100% Discount: Enjoy Zero Making Charges and Zero Wastage (VA) on your jewellery.</Text>
              <Text style={styles.body}>•	Security: Digital members redeem via OTP; physical passbook holders must surrender the book at redemption.</Text>
              <Text style={styles.body}>•	No Cash Refunds: All installments must be redeemed as jewellery; no cash refunds are permitted.</Text>
              <Text style={styles.body}>•	Early Termination: Closing the scheme before 330 days voids all benefits and may incur a cancellation fee.</Text>
              <Text style={styles.body}>•	Additional Costs: Customers are responsible for GST, Hallmark, and stone charges.</Text>
              <Text style={styles.body}>•	Benefits apply: Customers are required to finish the tenure of 11 months for the benefits to apply. Withdrawing early means forfeiture of said benefits.</Text>
              <Text style={styles.body}>•	Disputes: All regulatory or benefit disputes are handled in-store and in-person only.</Text>
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
