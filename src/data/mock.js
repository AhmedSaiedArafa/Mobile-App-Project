// Sample data. Fields ending in "Ar" are the Arabic version (read them with loc(item, 'field')).

export const user = {
  firstName: 'Ahmed',
  fullName: 'Ahmed Saied',
  fullNameAr: 'أحمد سعيد',
  ipa: 'ahmed.saied@swiftflow',
  mobile: '01001234567',
  email: 'ahmed.saied@example.com',
  memberSince: 'March 2024',
  memberSinceAr: 'مارس 2024',
  verified: true,
};

// Placeholder support contacts - replace with the real ones from your backend/config.
export const support = {
  phone: '19623',
  email: 'support@example.com',
  hours: 'Available 24/7',
  hoursAr: 'متاحون على مدار الساعة',
};

export const userIPAs = [
  { id: 'ipa1', address: 'ahmed.saied@swiftflow', accountId: 'cib', isDefault: true, createdAt: 'Mar 12, 2024', createdAtAr: '12 مارس 2024' },
  { id: 'ipa2', address: 'ahmed.savings@swiftflow', accountId: 'bm', isDefault: false, createdAt: 'Aug 03, 2025', createdAtAr: '3 أغسطس 2025' },
];

export const trustedDevices = [
  { id: 'd1', name: 'iPhone 15', os: 'iOS 19.1', icon: 'phone-portrait', location: 'Cairo, Egypt', locationAr: 'القاهرة، مصر', lastActive: 'Active now', addedOn: 'Jan 04, 2026', addedOnAr: '4 يناير 2026', current: true },
  { id: 'd2', name: 'Samsung Galaxy S24', os: 'Android 16', icon: 'phone-portrait-outline', location: 'Giza, Egypt', locationAr: 'الجيزة، مصر', lastActive: 'Oct 22, 2026', lastActiveAr: '22 أكتوبر 2026', addedOn: 'Mar 12, 2024', addedOnAr: '12 مارس 2024', current: false },
  { id: 'd3', name: 'iPad Air', os: 'iPadOS 19', icon: 'tablet-portrait-outline', location: 'Alexandria, Egypt', locationAr: 'الإسكندرية، مصر', lastActive: 'Sep 30, 2026', lastActiveAr: '30 سبتمبر 2026', addedOn: 'Jun 18, 2025', addedOnAr: '18 يونيو 2025', current: false },
];

// link: screen to open when the notification is tapped
export const notifications = [
  { id: 'n1', type: 'transaction', group: 'Today', read: false,
    title: 'Money sent', titleAr: 'تم إرسال الأموال',
    body: 'You sent 1,000.00 EGP to Ahmed Mohamed.', bodyAr: 'أرسلت 1,000.00 ج.م إلى أحمد محمد.',
    time: '2:30 PM', timeAr: '2:30 م' },
  { id: 'n2', type: 'security', group: 'Today', read: false, link: 'Settings',
    title: 'New login', titleAr: 'تسجيل دخول جديد',
    body: 'Your account was accessed from a new iPhone 15. Not you? Change your PIN.', bodyAr: 'تم الدخول إلى حسابك من جهاز iPhone 15 جديد. لست أنت؟ غيّر رقمك السري.',
    time: '9:12 AM', timeAr: '9:12 ص' },
  { id: 'n3', type: 'bill', group: 'Today', read: false, link: 'Payments',
    title: 'Bill due soon', titleAr: 'فاتورة مستحقة قريباً',
    body: 'Your WE Home Internet bill of 610.00 EGP is due on Nov 05.', bodyAr: 'فاتورة إنترنت وي المنزلي بقيمة 610.00 ج.م مستحقة في 5 نوفمبر.',
    time: '8:00 AM', timeAr: '8:00 ص' },
  { id: 'n4', type: 'transaction', group: 'Earlier', read: true,
    title: 'Money received', titleAr: 'تم استلام أموال',
    body: 'Sara Ali sent you 2,500.00 EGP.', bodyAr: 'أرسلت لك سارة علي 2,500.00 ج.م.',
    time: 'Oct 19', timeAr: '19 أكتوبر' },
  { id: 'n5', type: 'bill', group: 'Earlier', read: true, link: 'Payments',
    title: 'Payment successful', titleAr: 'تم الدفع بنجاح',
    body: 'Electricity bill of 350.00 EGP paid to North Cairo Electricity.', bodyAr: 'تم دفع فاتورة كهرباء بقيمة 350.00 ج.م لشمال القاهرة لتوزيع الكهرباء.',
    time: 'Oct 20', timeAr: '20 أكتوبر' },
  { id: 'n6', type: 'offer', group: 'Earlier', read: true,
    title: 'Pay bills, get cashback', titleAr: 'ادفع فواتيرك واسترد نقداً',
    body: 'Get 5% cashback on your first 3 bill payments this month.', bodyAr: 'احصل على 5% استرداد نقدي على أول 3 مدفوعات فواتير هذا الشهر.',
    time: 'Oct 15', timeAr: '15 أكتوبر' },
  { id: 'n7', type: 'security', group: 'Earlier', read: true,
    title: 'PIN changed', titleAr: 'تم تغيير الرقم السري',
    body: 'Your IPN PIN was changed successfully.', bodyAr: 'تم تغيير رقمك السري IPN بنجاح.',
    time: 'Oct 10', timeAr: '10 أكتوبر' },
];

export const faqCategories = ['General', 'Transfers', 'Bills', 'IPA', 'Security', 'Fees & Limits'];

export const faqs = [
  { id: 'f1', category: 'General',
    q: 'What is SwiftFlow?', qAr: 'ما هو سويفت فلو؟',
    a: 'SwiftFlow lets you send and receive money instantly between bank accounts, cards and wallets in Egypt, 24/7, and pay your bills from one app.',
    aAr: 'يتيح لك سويفت فلو إرسال واستقبال الأموال فوراً بين الحسابات البنكية والبطاقات والمحافظ في مصر على مدار الساعة، ودفع فواتيرك من تطبيق واحد.' },
  { id: 'f2', category: 'General',
    q: 'Which banks can I link?', qAr: 'ما البنوك التي يمكنني ربطها؟',
    a: 'You can link debit cards and accounts from any participating bank in Egypt. Go to Accounts > Link account and follow the steps.',
    aAr: 'يمكنك ربط بطاقات الخصم والحسابات من أي بنك مشارك في مصر. اذهب إلى الحسابات > ربط حساب واتبع الخطوات.' },
  { id: 'f3', category: 'Transfers',
    q: 'How long does a transfer take?', qAr: 'كم يستغرق التحويل؟',
    a: 'Transfers are instant. The money reaches the recipient within seconds, any day and any time.',
    aAr: 'التحويلات فورية، وتصل الأموال إلى المستفيد خلال ثوانٍ في أي يوم وأي وقت.' },
  { id: 'f4', category: 'Transfers',
    q: 'Can I cancel a transfer?', qAr: 'هل يمكنني إلغاء تحويل؟',
    a: 'No. Instant transfers cannot be reversed once confirmed. Always check the recipient name before entering your PIN.',
    aAr: 'لا. لا يمكن استرداد التحويلات الفورية بعد تأكيدها. تحقق دائماً من اسم المستفيد قبل إدخال رقمك السري.' },
  { id: 'f5', category: 'Transfers',
    q: 'What can I send money to?', qAr: 'إلى أين يمكنني إرسال الأموال؟',
    a: 'You can send to an SwiftFlow address (IPA), a mobile number linked to SwiftFlow, a bank account number or IBAN, a card, or a mobile wallet.',
    aAr: 'يمكنك الإرسال إلى عنوان سويفت فلو (IPA)، أو رقم موبايل مرتبط بسويفت فلو، أو رقم حساب بنكي أو IBAN، أو بطاقة، أو محفظة موبايل.' },
  { id: 'f6', category: 'Bills',
    q: 'Which bills can I pay?', qAr: 'ما الفواتير التي يمكنني دفعها؟',
    a: 'Electricity, water, gas, mobile, internet, landline, education, insurance, credit cards, government services, subscriptions and donations.',
    aAr: 'الكهرباء والمياه والغاز والموبايل والإنترنت والتليفون الأرضي والتعليم والتأمين وبطاقات الائتمان والخدمات الحكومية والاشتراكات والتبرعات.' },
  { id: 'f7', category: 'Bills',
    q: 'I paid a bill but it still shows as due', qAr: 'دفعت فاتورة لكنها ما زالت تظهر مستحقة',
    a: 'Billers can take up to 24 hours to update. If it still shows as due after that, contact support with your reference number.',
    aAr: 'قد تستغرق الجهات حتى 24 ساعة لتحديث البيانات. إذا ظلت مستحقة بعد ذلك، تواصل مع الدعم مع ذكر الرقم المرجعي.' },
  { id: 'f8', category: 'IPA',
    q: 'What is an IPA?', qAr: 'ما هو عنوان IPA؟',
    a: 'An SwiftFlow Address is a short name like name@swiftflow that people can use to send you money without knowing your account number.',
    aAr: 'عنوان سويفت فلو هو اسم قصير مثل name@swiftflow يمكن للآخرين استخدامه لإرسال الأموال إليك دون معرفة رقم حسابك.' },
  { id: 'f9', category: 'IPA',
    q: 'Can I have more than one IPA?', qAr: 'هل يمكنني امتلاك أكثر من عنوان IPA؟',
    a: 'Yes. You can create one IPA per linked account and choose which one is your default for receiving money.',
    aAr: 'نعم. يمكنك إنشاء عنوان لكل حساب مرتبط واختيار العنوان الافتراضي لاستقبال الأموال.' },
  { id: 'f10', category: 'Security',
    q: 'What is the IPN PIN?', qAr: 'ما هو الرقم السري IPN؟',
    a: 'Your 6-digit IPN PIN confirms every transaction. Never share it with anyone, including people claiming to be bank staff.',
    aAr: 'رقمك السري IPN المكوّن من 6 أرقام يؤكد كل معاملة. لا تشاركه مع أي شخص، حتى من يدّعي أنه موظف بنك.' },
  { id: 'f11', category: 'Security',
    q: 'I forgot my PIN', qAr: 'نسيت رقمي السري',
    a: 'Go to Profile > Change PIN > Forgot PIN and verify with your card details to set a new one.',
    aAr: 'اذهب إلى حسابي > تغيير الرقم السري > نسيت الرقم السري، وتحقق ببيانات بطاقتك لتعيين رقم جديد.' },
  { id: 'f12', category: 'Fees & Limits',
    q: 'What are the transfer fees?', qAr: 'ما رسوم التحويل؟',
    a: 'Transfers cost 0.1% of the amount, with a minimum of 0.50 EGP and a maximum of 20 EGP per transfer.',
    aAr: 'تبلغ رسوم التحويل 0.1% من المبلغ، بحد أدنى 0.50 ج.م وحد أقصى 20 ج.م لكل تحويل.' },
  { id: 'f13', category: 'Fees & Limits',
    q: 'What are the transfer limits?', qAr: 'ما حدود التحويل؟',
    a: 'You can transfer up to 70,000 EGP per day. Your bank may apply its own limits as well.',
    aAr: 'يمكنك تحويل حتى 70,000 ج.م يومياً، وقد يطبق بنكك حدوداً إضافية.' },
];

export const accounts = [
  { id: 'cib', bank: 'CIB', name: 'CIB Current Account', nameAr: 'الحساب الجاري - CIB', number: '•••• 4821', fullNumber: '1000234567891', holder: 'Ahmed Saied', type: 'Current', balance: 18250, currency: 'EGP', status: 'Active', linkedOn: 'Oct 12, 2026', linkedOnAr: '12 أكتوبر 2026', logo: 'CIB', logoBg: '#FFFFFF', logoFg: '#0A4DA2' },
  { id: 'bm', bank: 'Banque Misr', name: 'Banque Misr Savings', nameAr: 'حساب توفير - بنك مصر', number: '•••• 7703', fullNumber: '2000987654321', holder: 'Ahmed Saied', type: 'Savings', balance: 7180, currency: 'EGP', status: 'Active', linkedOn: 'Oct 20, 2026', linkedOnAr: '20 أكتوبر 2026', logo: 'BM', logoBg: '#14112E', logoFg: '#FF5A5F' },
];

export const accountTypes = ['Savings', 'Current'];

export const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

export const banks = [
  { id: 'nbe', name: 'National Bank of Egypt', nameAr: 'البنك الأهلي المصري', short: 'NBE', color: '#0B6B3A' },
  { id: 'bm', name: 'Banque Misr', nameAr: 'بنك مصر', short: 'BM', color: '#8E1B1B' },
  { id: 'cib', name: 'Commercial International Bank', nameAr: 'البنك التجاري الدولي', short: 'CIB', color: '#0A4DA2' },
  { id: 'qnb', name: 'QNB Al Ahli', nameAr: 'بنك QNB الأهلي', short: 'QNB', color: '#5C1A4A' },
  { id: 'alex', name: 'Bank of Alexandria', nameAr: 'بنك الإسكندرية', short: 'ALEX', color: '#C8102E' },
  { id: 'aaib', name: 'Arab African International Bank', nameAr: 'البنك العربي الأفريقي الدولي', short: 'AAIB', color: '#1E3A8A' },
  { id: 'hsbc', name: 'HSBC Egypt', nameAr: 'بنك HSBC مصر', short: 'HSBC', color: '#DB0011' },
  { id: 'adib', name: 'Abu Dhabi Islamic Bank', nameAr: 'مصرف أبوظبي الإسلامي', short: 'ADIB', color: '#0F766E' },
  { id: 'faisal', name: 'Faisal Islamic Bank', nameAr: 'بنك فيصل الإسلامي', short: 'FIB', color: '#166534' },
  { id: 'cae', name: 'Crédit Agricole Egypt', nameAr: 'بنك كريدي أجريكول مصر', short: 'CAE', color: '#047857' },
];

export const recipients = [
  { id: 'r1', name: 'Ahmed Mohamed', nameAr: 'أحمد محمد', ipa: 'ahmed.mohamed@swiftflow', mobile: '01012345678', bank: 'CIB', favorite: true, accent: 'purple' },
  { id: 'r2', name: 'Sara Ali', nameAr: 'سارة علي', ipa: 'sara.ali@swiftflow', mobile: '01198765432', bank: 'NBE', favorite: true, accent: 'green' },
  { id: 'r3', name: 'Mona Hassan', nameAr: 'منى حسن', ipa: 'mona.h@swiftflow', mobile: '01234567890', bank: 'QNB', favorite: true, accent: 'pink' },
  { id: 'r4', name: 'Omar Khaled', nameAr: 'عمر خالد', ipa: 'omar.khaled@swiftflow', mobile: '01555667788', bank: 'BM', favorite: false, accent: 'blue' },
  { id: 'r5', name: 'Youssef Adel', nameAr: 'يوسف عادل', ipa: 'youssef.adel@swiftflow', mobile: '01066554433', bank: 'HSBC', favorite: false, accent: 'orange' },
  { id: 'r6', name: 'Nour El-Din', nameAr: 'نور الدين', ipa: 'nour.eldin@swiftflow', mobile: '01122334455', bank: 'AAIB', favorite: false, accent: 'teal' },
];

export const recentTransactions = [
  { id: 't1', title: 'Transfer to Ahmed Mohamed', titleAr: 'تحويل إلى أحمد محمد', meta: 'Today, 2:30 PM', metaAr: 'اليوم، 2:30 م', amount: -1000, icon: 'paper-plane', accent: 'purple' },
  { id: 't2', title: 'Electricity Bill', titleAr: 'فاتورة كهرباء', meta: 'Oct 20, 2026 • Egypt Electricity', metaAr: '20 أكتوبر 2026 • كهرباء مصر', amount: -350, icon: 'document-text-outline', accent: 'blue' },
  { id: 't3', title: 'Received from Sara Ali', titleAr: 'استلام من سارة علي', meta: 'Oct 19, 2026 • IPA Transfer', metaAr: '19 أكتوبر 2026 • تحويل IPA', amount: 2500, icon: 'arrow-down', accent: 'green' },
  { id: 't4', title: 'Transfer to Bank Account', titleAr: 'تحويل إلى حساب بنكي', meta: 'Oct 18, 2026 • CIB', metaAr: '18 أكتوبر 2026 • CIB', amount: -5000, icon: 'card', accent: 'purple' },
];

// mode: 'inquiry' -> fetch the due bill by reference; 'amount' -> user types the amount
export const billCategories = [
  { id: 'electricity', name: 'Electricity', nameAr: 'الكهرباء', icon: 'flash', accent: 'yellow', mode: 'inquiry',
    field: { label: 'Meter / Account Number', labelAr: 'رقم العداد / الحساب', placeholder: 'e.g. 0123456789', placeholderAr: 'مثال: 0123456789', keyboard: 'number-pad', min: 8, max: 14 } },
  { id: 'water', name: 'Water', nameAr: 'المياه', icon: 'water', accent: 'blue', mode: 'inquiry',
    field: { label: 'Customer Number', labelAr: 'رقم العميل', placeholder: 'e.g. 4400112233', placeholderAr: 'مثال: 4400112233', keyboard: 'number-pad', min: 8, max: 14 } },
  { id: 'gas', name: 'Natural Gas', nameAr: 'الغاز الطبيعي', icon: 'flame', accent: 'orange', mode: 'inquiry',
    field: { label: 'Subscriber Number', labelAr: 'رقم المشترك', placeholder: 'e.g. 22003311', placeholderAr: 'مثال: 22003311', keyboard: 'number-pad', min: 6, max: 12 } },
  { id: 'mobile', name: 'Mobile', nameAr: 'الموبايل', icon: 'phone-portrait', accent: 'purple', mode: 'amount',
    field: { label: 'Mobile Number', labelAr: 'رقم الموبايل', placeholder: '01X XXXX XXXX', keyboard: 'phone-pad', min: 11, max: 11 } },
  { id: 'internet', name: 'Internet', nameAr: 'الإنترنت', icon: 'wifi', accent: 'teal', mode: 'inquiry',
    field: { label: 'Landline Number (with area code)', labelAr: 'رقم التليفون الأرضي (بكود المحافظة)', placeholder: 'e.g. 0223456789', placeholderAr: 'مثال: 0223456789', keyboard: 'phone-pad', min: 9, max: 11 } },
  { id: 'landline', name: 'Landline', nameAr: 'التليفون الأرضي', icon: 'call', accent: 'green', mode: 'inquiry',
    field: { label: 'Landline Number (with area code)', labelAr: 'رقم التليفون الأرضي (بكود المحافظة)', placeholder: 'e.g. 0223456789', placeholderAr: 'مثال: 0223456789', keyboard: 'phone-pad', min: 9, max: 11 } },
  { id: 'education', name: 'Education', nameAr: 'التعليم', icon: 'school', accent: 'blue', mode: 'inquiry',
    field: { label: 'Student ID', labelAr: 'الرقم الجامعي', placeholder: 'e.g. 20231045', placeholderAr: 'مثال: 20231045', keyboard: 'number-pad', min: 6, max: 14 } },
  { id: 'donations', name: 'Donations', nameAr: 'التبرعات', icon: 'heart', accent: 'pink', mode: 'amount',
    field: { label: 'Donor Mobile (optional)', labelAr: 'موبايل المتبرع (اختياري)', placeholder: '01X XXXX XXXX', keyboard: 'phone-pad', min: 0, max: 11 } },
  { id: 'insurance', name: 'Insurance', nameAr: 'التأمين', icon: 'shield-checkmark', accent: 'green', mode: 'inquiry',
    field: { label: 'Policy Number', labelAr: 'رقم الوثيقة', placeholder: 'e.g. POL-778812', placeholderAr: 'مثال: POL-778812', keyboard: 'default', min: 6, max: 20 } },
  { id: 'cards', name: 'Credit Cards', nameAr: 'بطاقات الائتمان', icon: 'card', accent: 'purple', mode: 'amount',
    field: { label: 'Card Number', labelAr: 'رقم البطاقة', placeholder: 'XXXX XXXX XXXX XXXX', keyboard: 'number-pad', min: 16, max: 19 } },
  { id: 'government', name: 'Government', nameAr: 'الخدمات الحكومية', icon: 'business', accent: 'orange', mode: 'inquiry',
    field: { label: 'Reference Number', labelAr: 'الرقم المرجعي', placeholder: 'e.g. 9988776655', placeholderAr: 'مثال: 9988776655', keyboard: 'number-pad', min: 8, max: 16 } },
  { id: 'subscriptions', name: 'Subscriptions', nameAr: 'الاشتراكات', icon: 'tv', accent: 'red', mode: 'amount',
    field: { label: 'Subscriber ID / Email', labelAr: 'رقم المشترك / البريد', placeholder: 'Your account ID', placeholderAr: 'معرّف حسابك', keyboard: 'default', min: 3, max: 50 } },
];

export const providers = {
  electricity: [
    { id: 'nced', name: 'North Cairo Electricity', nameAr: 'شمال القاهرة لتوزيع الكهرباء', short: 'NC', color: '#E0A100' },
    { id: 'sced', name: 'South Cairo Electricity', nameAr: 'جنوب القاهرة لتوزيع الكهرباء', short: 'SC', color: '#D08F00' },
    { id: 'aedc', name: 'Alexandria Electricity', nameAr: 'الإسكندرية لتوزيع الكهرباء', short: 'AX', color: '#C77D00' },
    { id: 'cedc', name: 'Canal Electricity', nameAr: 'القناة لتوزيع الكهرباء', short: 'CN', color: '#B26A00' },
    { id: 'nded', name: 'North Delta Electricity', nameAr: 'شمال الدلتا لتوزيع الكهرباء', short: 'ND', color: '#996000' },
  ],
  water: [
    { id: 'cw', name: 'Cairo Water Company', nameAr: 'شركة مياه القاهرة', short: 'CW', color: '#2F6BFF' },
    { id: 'gw', name: 'Giza Water Company', nameAr: 'شركة مياه الجيزة', short: 'GW', color: '#1E4FD8' },
    { id: 'aw', name: 'Alexandria Water Company', nameAr: 'شركة مياه الإسكندرية', short: 'AW', color: '#173EAD' },
  ],
  gas: [
    { id: 'pt', name: 'Petrotrade', nameAr: 'بتروتريد', short: 'PT', color: '#F07A1A' },
    { id: 'tg', name: 'Town Gas', nameAr: 'تاون جاس', short: 'TG', color: '#D9630A' },
    { id: 'eg', name: 'Egypt Gas', nameAr: 'غاز مصر', short: 'EG', color: '#B54F05' },
  ],
  mobile: [
    { id: 'voda', name: 'Vodafone', nameAr: 'فودافون', short: 'V', color: '#E60000', services: ['Recharge', 'Postpaid Bill', 'Internet Bundle'] },
    { id: 'orange', name: 'Orange', nameAr: 'أورنج', short: 'O', color: '#FF7900', services: ['Recharge', 'Postpaid Bill', 'Internet Bundle'] },
    { id: 'eand', name: 'e& Egypt', nameAr: 'اتصالات من e&', short: 'e&', color: '#D50032', services: ['Recharge', 'Postpaid Bill'] },
    { id: 'we', name: 'WE', nameAr: 'وي', short: 'WE', color: '#5C2D91', services: ['Recharge', 'Postpaid Bill'] },
  ],
  internet: [
    { id: 'wehome', name: 'WE Home Internet', nameAr: 'إنترنت وي المنزلي', short: 'WE', color: '#5C2D91' },
    { id: 'vadsl', name: 'Vodafone Home Internet', nameAr: 'إنترنت فودافون المنزلي', short: 'V', color: '#E60000' },
    { id: 'oadsl', name: 'Orange Home Internet', nameAr: 'إنترنت أورنج المنزلي', short: 'O', color: '#FF7900' },
    { id: 'eadsl', name: 'e& Home Internet', nameAr: 'إنترنت e& المنزلي', short: 'e&', color: '#D50032' },
  ],
  landline: [{ id: 'te', name: 'Telecom Egypt', nameAr: 'المصرية للاتصالات', short: 'TE', color: '#5C2D91' }],
  education: [
    { id: 'cu', name: 'Cairo University', nameAr: 'جامعة القاهرة', short: 'CU', color: '#1E3A8A' },
    { id: 'asu', name: 'Ain Shams University', nameAr: 'جامعة عين شمس', short: 'ASU', color: '#0F766E' },
    { id: 'au', name: 'Alexandria University', nameAr: 'جامعة الإسكندرية', short: 'AU', color: '#7C2D12' },
  ],
  donations: [
    { id: 'efb', name: 'Egyptian Food Bank', nameAr: 'بنك الطعام المصري', short: 'EFB', color: '#16A36A' },
    { id: '57357', name: 'Children’s Cancer Hospital 57357', nameAr: 'مستشفى سرطان الأطفال 57357', short: '57', color: '#E5484D' },
    { id: 'myf', name: 'Magdi Yacoub Heart Foundation', nameAr: 'مؤسسة مجدي يعقوب للقلب', short: 'MY', color: '#B91C1C' },
    { id: 'resala', name: 'Resala Charity', nameAr: 'جمعية رسالة', short: 'R', color: '#0E9F9A' },
  ],
  insurance: [
    { id: 'misr', name: 'Misr Insurance', nameAr: 'مصر للتأمين', short: 'MI', color: '#0B6B3A' },
    { id: 'axa', name: 'AXA Egypt', nameAr: 'أكسا مصر', short: 'AXA', color: '#00008F' },
    { id: 'allianz', name: 'Allianz Egypt', nameAr: 'أليانز مصر', short: 'AZ', color: '#003781' },
  ],
  cards: [
    { id: 'cibcc', name: 'CIB Credit Card', nameAr: 'بطاقة ائتمان CIB', short: 'CIB', color: '#0A4DA2' },
    { id: 'nbecc', name: 'NBE Credit Card', nameAr: 'بطاقة ائتمان البنك الأهلي', short: 'NBE', color: '#0B6B3A' },
    { id: 'bmcc', name: 'Banque Misr Credit Card', nameAr: 'بطاقة ائتمان بنك مصر', short: 'BM', color: '#8E1B1B' },
    { id: 'qnbcc', name: 'QNB Credit Card', nameAr: 'بطاقة ائتمان QNB', short: 'QNB', color: '#5C1A4A' },
  ],
  government: [
    { id: 'traffic', name: 'Traffic Violations', nameAr: 'المخالفات المرورية', short: 'TV', color: '#F07A1A' },
    { id: 'tax', name: 'Egyptian Tax Authority', nameAr: 'مصلحة الضرائب المصرية', short: 'ETA', color: '#1E3A8A' },
    { id: 'customs', name: 'Egyptian Customs', nameAr: 'الجمارك المصرية', short: 'EC', color: '#0F766E' },
  ],
  subscriptions: [
    { id: 'shahid', name: 'Shahid VIP', nameAr: 'شاهد VIP', short: 'S', color: '#16A36A' },
    { id: 'watchit', name: 'Watch It', nameAr: 'واتش إت', short: 'W', color: '#E5484D' },
    { id: 'osn', name: 'OSN+', nameAr: 'OSN+', short: 'OSN', color: '#111827' },
  ],
};

export const transactions = [
  { id: 't1', type: 'sent', group: 'Today',
    title: 'Transfer to Ahmed Mohamed', titleAr: 'تحويل إلى أحمد محمد',
    subtitle: '2:30 PM', subtitleAr: '2:30 م',
    amount: -1000, reference: 'TRX-20261026-4821',
    date: 'Oct 26, 2026 • 2:30 PM', dateAr: '26 أكتوبر 2026 • 2:30 م',
    from: 'Main Account ••4521', to: 'ahmed.m@swiftflow', method: 'Transfer by IPA', methodAr: 'تحويل عبر IPA', fee: 0 },
  { id: 't2', type: 'bill', group: 'Earlier',
    title: 'Electricity Bill', titleAr: 'فاتورة كهرباء',
    subtitle: 'Oct 20, 2026 • Egypt Electricity', subtitleAr: '20 أكتوبر 2026 • كهرباء مصر',
    amount: -350, reference: 'TRX-20261020-3377',
    date: 'Oct 20, 2026 • 9:15 AM', dateAr: '20 أكتوبر 2026 • 9:15 ص',
    from: 'Main Account ••4521', to: 'Egypt Electricity', method: 'Bill payment', methodAr: 'دفع فاتورة', fee: 0 },
  { id: 't3', type: 'received', group: 'Earlier',
    title: 'Received from Sara Ali', titleAr: 'استلام من سارة علي',
    subtitle: 'Oct 19, 2026 • IPA Transfer', subtitleAr: '19 أكتوبر 2026 • تحويل IPA',
    amount: 2500, reference: 'TRX-20261019-5120',
    date: 'Oct 19, 2026 • 6:40 PM', dateAr: '19 أكتوبر 2026 • 6:40 م',
    from: 'sara.ali@swiftflow', to: 'Main Account ••4521', method: 'IPA Transfer', methodAr: 'تحويل IPA', fee: 0 },
  { id: 't4', type: 'sent', group: 'Earlier',
    title: 'Transfer to Bank Account', titleAr: 'تحويل إلى حساب بنكي',
    subtitle: 'Oct 18, 2026 • CIB', subtitleAr: '18 أكتوبر 2026 • CIB',
    amount: -5000, reference: 'TRX-20261018-2209',
    date: 'Oct 18, 2026 • 1:05 PM', dateAr: '18 أكتوبر 2026 • 1:05 م',
    from: 'Main Account ••4521', to: 'CIB ••8802', method: 'Bank transfer', methodAr: 'تحويل بنكي', fee: 0 },
];

export const savedBillers = [
  { id: 's1', nickname: 'Home Electricity', nicknameAr: 'كهرباء المنزل', categoryId: 'electricity', providerId: 'nced', reference: '0123456789', due: 350 },
  { id: 's2', nickname: 'My Vodafone Line', nicknameAr: 'خط فودافون', categoryId: 'mobile', providerId: 'voda', reference: '01012345678', due: null },
  { id: 's3', nickname: 'Home Internet', nicknameAr: 'إنترنت المنزل', categoryId: 'internet', providerId: 'wehome', reference: '0223456789', due: 610 },
];

export const recentPayments = [
  { id: 'p1', title: 'Electricity Bill', titleAr: 'فاتورة كهرباء', meta: 'Oct 20, 2026 • North Cairo Electricity', metaAr: '20 أكتوبر 2026 • شمال القاهرة للكهرباء', amount: -350, icon: 'flash', accent: 'yellow' },
  { id: 'p2', title: 'Vodafone Recharge', titleAr: 'شحن فودافون', meta: 'Oct 15, 2026 • 01012345678', metaAr: '15 أكتوبر 2026 • 01012345678', amount: -100, icon: 'phone-portrait', accent: 'purple' },
  { id: 'p3', title: 'WE Home Internet', titleAr: 'إنترنت وي المنزلي', meta: 'Oct 02, 2026 • 0223456789', metaAr: '2 أكتوبر 2026 • 0223456789', amount: -610, icon: 'wifi', accent: 'teal' },
];

export const findCategory = (id) => billCategories.find((c) => c.id === id);
export const findProvider = (categoryId, id) => (providers[categoryId] || []).find((p) => p.id === id);
