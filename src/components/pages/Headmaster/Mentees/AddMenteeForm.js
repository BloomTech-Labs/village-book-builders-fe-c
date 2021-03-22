import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Checkbox,
  DatePicker,
  Radio,
  Button,
  Row,
  Col,
  Select,
  TimePicker,
} from 'antd';
import moment from 'moment';
import '../../../../style.css';

let initialState = {
  first_name: '',
  last_name: '',
  gender: '',
  dob: '',
  mentee_picture: 'http://placeimg.com/640/480',
  hasAssignedMentor: false,
  hasAppointment: false,
  english_lvl: '',
  math_lvl: '',
  reading_lvl: '',
  school_lvl: '',
  academic_description: '',
  support_needed: '',
  primary_language: '',
  availability: {
    time_zone: '',
    as_early_as: '',
    as_late_as: '',
    methods: [],
  },
  email: '',
  dynamic_questions: [
    {
      qId: 0,
      question: 'My favorite thing to do in my free time is',
    },
    {
      qId: 1,
      question: 'When I grow up, I want to be',
    },
    {
      qId: 2,
      question: 'Goals & Dreams Notes',
    },
    {
      qId: 3,
      question: 'Personal Struggles Notes',
    },
    {
      qId: 4,
      question: 'Other interests/hobbies',
    },
    {
      qId: 5,
      question: 'Skills Notes',
    },
    {
      qId: 6,
      question: 'Family Notes',
    },
    {
      qId: 7,
      question: 'Other Notes',
    },
    {
      qId: 8,
      question: 'Admin Notes',
    },
  ],
};

const AddMenteeForm = ({ onsubmit, loading }) => {
  //   debugLog(
  //     'Prop drilled from Mentees.js',
  //     currentMentee,
  //     moment.utc(currentMentee.dob).format('dddd, MMMM Do of YYYY')
  //   );
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initialState);
  const { Option } = Select;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = e => {
    setFormData({
      ...formData,
      availability: { ...formData.availability, methods: e },
    });
  };

  const handleQuestionsChange = e => {
    if (
      !Object.keys(formData.dynamic_questions).find(
        key => formData.dynamic_questions['qId'] === e.target.id
      )
    ) {
      formData.dynamic_questions[parseInt(e.target.id)].answer = e.target.value;
    }
  };

  const handleSubmit = async e => {
    await onsubmit(formData);
    form.resetFields();
  };

  // console.log('formData', formData);

  return (
    <Form form={form} onFinish={handleSubmit}>
      {/* <Form> */}
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <h4>Personal Information</h4>
          <Form.Item
            label="First Name"
            name="first_name"
            value={formData.first_name}
            rules={[{ required: true, message: 'First Name is required.' }]}
          >
            <Input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Last Name is required.' }]}
          >
            <Input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group
              name="gender"
              value={formData.gender}
              onChange={e => handleChange(e)}
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Other">Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Email Address is required.' }]}
          >
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Primary Language"
            name="primary_language"
            rules={[
              { required: true, message: 'Primary Language is required.' },
            ]}
          >
            {/* <Input
              type="text"
              name="primary_language"
              value={formData.primary_language}
              onChange={e => handleChange(e)}
            /> */}
            <Select
              // showSearch
              // optionFilterProp="children"
              // filterOption={(input, option) =>
              //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
              onChange={e =>
                setFormData({
                  ...formData,
                  primary_language: e,
                })
              }
            >
              <Option value="Abkhazian">Abkhazian</Option>
              <Option value="Afar">Afar</Option>
              <Option value="Afrikaans">Afrikaans</Option>
              <Option value="Akan">Akan</Option>
              <Option value="Albanian">Albanian</Option>
              <Option value="Amharic">Amharic</Option>
              <Option value="Arabic">Arabic</Option>
              <Option value="Aragonese">Aragonese</Option>
              <Option value="Armenian">Armenian</Option>
              <Option value="Assamese">Assamese</Option>
              <Option value="Avaric">Avaric</Option>
              <Option value="Avestan">Avestan</Option>
              <Option value="Aymara">Aymara</Option>
              <Option value="Azerbaijani">Azerbaijani</Option>
              <Option value="Bambara">Bambara</Option>
              <Option value="Bashkir">Bashkir</Option>
              <Option value="Basque">Basque</Option>
              <Option value="Belarusian">Belarusian</Option>
              <Option value="Bengali">Bengali</Option>
              <Option value="Bihari">Bihari languages</Option>
              <Option value="Bislama">Bislama</Option>
              <Option value="Bosnian">Bosnian</Option>
              <Option value="Breton">Breton</Option>
              <Option value="Bulgarian">Bulgarian</Option>
              <Option value="Burmese">Burmese</Option>
              <Option value="Catalan, Valencian">Catalan, Valencian</Option>
              <Option value="Khmer">Central Khmer</Option>
              <Option value="Chamorro">Chamorro</Option>
              <Option value="Chechen">Chechen</Option>
              <Option value="Chichewa, Chewa, Nyanja">
                Chichewa, Chewa, Nyanja
              </Option>
              <Option value="Chinese">Chinese</Option>
              <Option value="Church Slavonic, Old Bulgarian, Old Church Slavonic">
                Church Slavonic, Old Bulgarian, Old Church Slavonic
              </Option>
              <Option value="Chuvash">Chuvash</Option>
              <Option value="Cornish">Cornish</Option>
              <Option value="Corsican">Corsican</Option>
              <Option value="Cree">Cree</Option>
              <Option value="Croatian">Croatian</Option>
              <Option value="Czech">Czech</Option>
              <Option value="Danish">Danish</Option>
              <Option value="Divehi, Dhivehi, Maldivian">
                Divehi, Dhivehi, Maldivian
              </Option>
              <Option value="Dutch, Flemish">Dutch, Flemish</Option>
              <Option value="Dzongkha">Dzongkha</Option>
              <Option value="English">English</Option>
              <Option value="Esperanto">Esperanto</Option>
              <Option value="Estonian">Estonian</Option>
              <Option value="Ewe">Ewe</Option>
              <Option value="Faroese">Faroese</Option>
              <Option value="Fijian">Fijian</Option>
              <Option value="Finnish">Finnish</Option>
              <Option value="French">French</Option>
              <Option value="Fulah">Fulah</Option>
              <Option value="Gaelic, Scottish Gaelic">
                Gaelic, Scottish Gaelic
              </Option>
              <Option value="Galician">Galician</Option>
              <Option value="Ganda">Ganda</Option>
              <Option value="Georgian">Georgian</Option>
              <Option value="German">German</Option>
              <Option value="Gikuyu, Kikuy">Gikuyu, Kikuyu</Option>
              <Option value="Greek">Greek (Modern)</Option>
              <Option value="Greenlandic, Kalaallisut">
                Greenlandic, Kalaallisut
              </Option>
              <Option value="gGuaranin">Guarani</Option>
              <Option value="Gujarati">Gujarati</Option>
              <Option value="Haitian, Haitian Creole">
                Haitian, Haitian Creole
              </Option>
              <Option value="Hausa">Hausa</Option>
              <Option value="Hebrew">Hebrew</Option>
              <Option value="Herero">Herero</Option>
              <Option value="Hindi">Hindi</Option>
              <Option value="Hiri Mot">Hiri Motu</Option>
              <Option value="Hungarian">Hungarian</Option>
              <Option value="Icelandic">Icelandic</Option>
              <Option value="Ido">Ido</Option>
              <Option value="Igbo">Igbo</Option>
              <Option value="Indonesian">Indonesian</Option>
              <Option value="Interlingua">
                Interlingua (International Auxiliary Language Association)
              </Option>
              <Option value="Interlingue">Interlingue</Option>
              <Option value="Inuktitut">Inuktitut</Option>
              <Option value="Inupiaq">Inupiaq</Option>
              <Option value="Irish">Irish</Option>
              <Option value="Italian">Italian</Option>
              <Option value="Japanese">Japanese</Option>
              <Option value="Javanese">Javanese</Option>
              <Option value="Kannada">Kannada</Option>
              <Option value="Kanuri">Kanuri</Option>
              <Option value="Kashmiri">Kashmiri</Option>
              <Option value="Kazakh">Kazakh</Option>
              <Option value="Kinyarwanda">Kinyarwanda</Option>
              <Option value="kKomiv">Komi</Option>
              <Option value="Kongo">Kongo</Option>
              <Option value="Korean">Korean</Option>
              <Option value="Kwanyama, Kuanyama">Kwanyama, Kuanyama</Option>
              <Option value="Kurdish">Kurdish</Option>
              <Option value="Kyrgyz">Kyrgyz</Option>
              <Option value="Lao">Lao</Option>
              <Option value="Latin">Latin</Option>
              <Option value="Latvian">Latvian</Option>
              <Option value="Letzeburgesch, Luxembourgish">
                Letzeburgesch, Luxembourgish
              </Option>
              <Option value="Limburgish, Limburgan, Limburge">
                Limburgish, Limburgan, Limburger
              </Option>
              <Option value="Lingala">Lingala</Option>
              <Option value="Lithuanian">Lithuanian</Option>
              <Option value="Luba-Katanga">Luba-Katanga</Option>
              <Option value="Macedonian">Macedonian</Option>
              <Option value="Malagasy">Malagasy</Option>
              <Option value="Malay">Malay</Option>
              <Option value="Malayalam">Malayalam</Option>
              <Option value="Maltese">Maltese</Option>
              <Option value="Manx">Manx</Option>
              <Option value="Maori">Maori</Option>
              <Option value="Marathi">Marathi</Option>
              <Option value="Marshallese">Marshallese</Option>
              <Option value="Moldovan, Moldavian, Romania">
                Moldovan, Moldavian, Romanian
              </Option>
              <Option value="Mongolian">Mongolian</Option>
              <Option value="Nauru">Nauru</Option>
              <Option value="Navajo, Navah">Navajo, Navaho</Option>
              <Option value="Northern Ndebele">Northern Ndebele</Option>
              <Option value="Ndonga">Ndonga</Option>
              <Option value="Nepali">Nepali</Option>
              <Option value="Northern Sami">Northern Sami</Option>
              <Option value="Norwegian">Norwegian</Option>
              <Option value=">Norwegian Bokmål">Norwegian Bokmål</Option>
              <Option value="Norwegian Nynorsk">Norwegian Nynorsk</Option>
              <Option value="Nuosu, Sichuan Yi">Nuosu, Sichuan Yi</Option>
              <Option value="Occitan">Occitan (post 1500)</Option>
              <Option value="Ojibwa">Ojibwa</Option>
              <Option value="Oriya">Oriya</Option>
              <Option value="Oromo">Oromo</Option>
              <Option value="Ossetian, Ossetic">Ossetian, Ossetic</Option>
              <Option value="Pali">Pali</Option>
              <Option value="Panjabi, Punjabi">Panjabi, Punjabi</Option>
              <Option value="Pashto, Pushto">Pashto, Pushto</Option>
              <Option value="Persian">Persian</Option>
              <Option value="Polish">Polish</Option>
              <Option value="Portuguese">Portuguese</Option>
              <Option value="Quechua">Quechua</Option>
              <Option value="Romansh">Romansh</Option>
              <Option value="Rundi">Rundi</Option>
              <Option value="Russian">Russian</Option>
              <Option value="Samoan">Samoan</Option>
              <Option value="Sango">Sango</Option>
              <Option value="Sanskrit">Sanskrit</Option>
              <Option value="Sardinian">Sardinian</Option>
              <Option value="Serbian">Serbian</Option>
              <Option value="Shona">Shona</Option>
              <Option value="Sindhi">Sindhi</Option>
              <Option value="Sinhala, Sinhalese">Sinhala, Sinhalese</Option>
              <Option value="Slovak">Slovak</Option>
              <Option value="Slovenian">Slovenian</Option>
              <Option value="Somali">Somali</Option>
              <Option value="Sotho, Southern">Sotho, Southern</Option>
              <Option value="South Ndebele">South Ndebele</Option>
              <Option value="Spanish, Castilian">Spanish, Castilian</Option>
              <Option value="Sundanese">Sundanese</Option>
              <Option value="Swahili">Swahili</Option>
              <Option value="Swati">Swati</Option>
              <Option value="Swedish">Swedish</Option>
              <Option value="Tagalog">Tagalog</Option>
              <Option value="Tahitian">Tahitian</Option>
              <Option value="Tajik">Tajik</Option>
              <Option value="Tamil">Tamil</Option>
              <Option value="Tatar">Tatar</Option>
              <Option value="Telugu">Telugu</Option>
              <Option value="Thai">Thai</Option>
              <Option value="Tibetan">Tibetan</Option>
              <Option value="Tigrinya">Tigrinya</Option>
              <Option value="Tonga">Tonga (Tonga Islands)</Option>
              <Option value="Tsonga">Tsonga</Option>
              <Option value="Tswana">Tswana</Option>
              <Option value="Turkish">Turkish</Option>
              <Option value="Turkmen">Turkmen</Option>
              <Option value="Twi">Twi</Option>
              <Option value="Uighur, Uyghur">Uighur, Uyghur</Option>
              <Option value="Ukrainian">Ukrainian</Option>
              <Option value="Urdu">Urdu</Option>
              <Option value="uUzbekz">Uzbek</Option>
              <Option value="Venda">Venda</Option>
              <Option value="Vietnamese">Vietnamese</Option>
              <Option value="Volap_k">Volap_k</Option>
              <Option value="Walloon">Walloon</Option>
              <Option value="Welsh">Welsh</Option>
              <Option value="Western Frisian">Western Frisian</Option>
              <Option value="Wolof">Wolof</Option>
              <Option value="Xhosa">Xhosa</Option>
              <Option value="Yiddish">Yiddish</Option>
              <Option value="Yoruba">Yoruba</Option>
              <Option value="Zhuang, Chuang">Zhuang, Chuang</Option>
              <Option value="Zulu">Zulu</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Date of Birth is required.' }]}
          >
            <DatePicker
              value={formData.dob}
              onChange={(e, date) => {
                setFormData({ ...formData, dob: date });
              }}
            />
          </Form.Item>
          <Form.Item
            label="English Level"
            name="english_lvl"
            rules={[{ required: true, message: 'English level is required.' }]}
          >
            <Input
              type="number"
              name="english_lvl"
              value={formData.english_lvl}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Math Level"
            name="math_lvl"
            rules={[{ required: true, message: 'Math level is required.' }]}
          >
            <Input
              type="number"
              name="math_lvl"
              value={formData.math_lvl}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Reading Level"
            name="reading_lvl"
            rules={[{ required: true, message: 'Reading level is required.' }]}
          >
            <Input
              type="number"
              name="reading_lvl"
              value={formData.reading_lvl}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="School Level"
            name="school_lvl"
            rules={[{ required: true, message: 'School level is required.' }]}
          >
            <Input
              type="number"
              name="school_lvl"
              value={formData.school_lvl}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Academic Description"
            name="academic_description"
            rules={[
              {
                required: true,
                message: 'Academic description level is required.',
              },
            ]}
          >
            <Input.TextArea
              rows={2}
              type="text"
              name="academic_description"
              value={formData.academic_description}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Support Needed"
            name="support_needed"
            rules={[
              { required: true, message: 'Support needed level is required.' },
            ]}
          >
            <Input.TextArea
              rows={2}
              type="text"
              name="support_needed"
              value={formData.support_needed}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <h4>Availability</h4>
          <Form.Item
            label="Timezone"
            name="timezone"
            rules={[{ required: true, message: 'Timezone is required.' }]}
          >
            {/* <Input
              type="text"
              name="timezone"
              fields={formData.availability.time_zone}
              onChange={e =>
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    time_zone: e.target.value,
                  },
                })
              }
            /> */}
            <Select
              onChange={e =>
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    time_zone: e,
                  },
                })
              }
            >
              <Option></Option>
              <Option value="Etc/GMT+12">
                (GMT-12:00) International Date Line West
              </Option>
              <Option value="Pacific/Midway">
                (GMT-11:00) Midway Island, Samoa
              </Option>
              <Option value="Pacific/Honolulu">(GMT-10:00) Hawaii</Option>
              <Option value="US/Alaska">(GMT-09:00) Alaska</Option>
              <Option value="America/Los_Angeles">
                (GMT-08:00) Pacific Time (US &#38; Canada)
              </Option>
              <Option value="America/Tijuana">
                (GMT-08:00) Tijuana, Baja California
              </Option>
              <Option value="US/Arizona">(GMT-07:00) Arizona</Option>
              <Option value="America/Chihuahua">
                (GMT-07:00) Chihuahua, La Paz, Mazatlan
              </Option>
              <Option value="US/Mountain">
                (GMT-07:00) Mountain Time (US &#38; Canada)
              </Option>
              <Option value="America/Managua">
                (GMT-06:00) Central America
              </Option>
              <Option value="US/Central">
                (GMT-06:00) Central Time (US &#38; Canada)
              </Option>
              <Option value="America/Mexico_City">
                (GMT-06:00) Guadalajara, Mexico City, Monterrey
              </Option>
              <Option value="Canada/Saskatchewan">
                (GMT-06:00) Saskatchewan
              </Option>
              <Option value="America/Bogota">
                (GMT-05:00) Bogota, Lima, Quito, Rio Branco
              </Option>
              <Option value="US/Eastern">
                (GMT-05:00) Eastern Time (US &#38; Canada)
              </Option>
              <Option value="US/East-Indiana">
                (GMT-05:00) Indiana (East)
              </Option>
              <Option value="Canada/Atlantic">
                (GMT-04:00) Atlantic Time (Canada)
              </Option>
              <Option value="America/Caracas">
                (GMT-04:00) Caracas, La Paz
              </Option>
              <Option value="America/Manaus">(GMT-04:00) Manaus</Option>
              <Option value="America/Santiago">(GMT-04:00) Santiago</Option>
              <Option value="Canada/Newfoundland">
                (GMT-03:30) Newfoundland
              </Option>
              <Option value="America/Sao_Paulo">(GMT-03:00) Brasilia</Option>
              <Option value="America/Argentina/Buenos_Aires">
                (GMT-03:00) Buenos Aires, Georgetown
              </Option>
              <Option value="America/Godthab">(GMT-03:00) Greenland</Option>
              <Option value="America/Montevideo">(GMT-03:00) Montevideo</Option>
              <Option value="America/Noronha">(GMT-02:00) Mid-Atlantic</Option>
              <Option value="Atlantic/Cape_Verde">
                (GMT-01:00) Cape Verde Is.
              </Option>
              <Option value="Atlantic/Azores">(GMT-01:00) Azores</Option>
              <Option value="Africa/Casablanca">
                (GMT+00:00) Casablanca, Monrovia, Reykjavik
              </Option>
              <Option value="Etc/Greenwich">
                (GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon,
                London
              </Option>
              <Option value="Europe/Amsterdam">
                (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
              </Option>
              <Option value="Europe/Belgrade">
                (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
              </Option>
              <Option value="Europe/Brussels">
                (GMT+01:00) Brussels, Copenhagen, Madrid, Paris
              </Option>
              <Option value="Europe/Sarajevo">
                (GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb
              </Option>
              <Option value="Africa/Lagos">
                (GMT+01:00) West Central Africa
              </Option>
              <Option value="Asia/Amman">(GMT+02:00) Amman</Option>
              <Option value="Europe/Athens">
                (GMT+02:00) Athens, Bucharest, Istanbul
              </Option>
              <Option value="Asia/Beirut">(GMT+02:00) Beirut</Option>
              <Option value="Africa/Cairo">(GMT+02:00) Cairo</Option>
              <Option value="Africa/Harare">
                (GMT+02:00) Harare, Pretoria
              </Option>
              <Option value="Europe/Helsinki">
                (GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
              </Option>
              <Option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</Option>
              <Option value="Europe/Minsk">(GMT+02:00) Minsk</Option>
              <Option value="Africa/Windhoek">(GMT+02:00) Windhoek</Option>
              <Option value="Asia/Kuwait">
                (GMT+03:00) Kuwait, Riyadh, Baghdad
              </Option>
              <Option value="Europe/Moscow">
                (GMT+03:00) Moscow, St. Petersburg, Volgograd
              </Option>
              <Option value="Africa/Nairobi">(GMT+03:00) Nairobi</Option>
              <Option value="Asia/Tbilisi">(GMT+03:00) Tbilisi</Option>
              <Option value="Asia/Tehran">(GMT+03:30) Tehran</Option>
              <Option value="Asia/Muscat">(GMT+04:00) Abu Dhabi, Muscat</Option>
              <Option value="Asia/Baku">(GMT+04:00) Baku</Option>
              <Option value="Asia/Yerevan">(GMT+04:00) Yerevan</Option>
              <Option value="Asia/Kabul">(GMT+04:30) Kabul</Option>
              <Option value="Asia/Yekaterinburg">
                (GMT+05:00) Yekaterinburg
              </Option>
              <Option value="Asia/Karachi">
                (GMT+05:00) Islamabad, Karachi, Tashkent
              </Option>
              <Option value="Asia/Calcutta">
                (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
              </Option>
              <Option value="Asia/Calcutta">
                (GMT+05:30) Sri Jayawardenapura
              </Option>
              <Option value="Asia/Katmandu">(GMT+05:45) Kathmandu</Option>
              <Option value="Asia/Almaty">
                (GMT+06:00) Almaty, Novosibirsk
              </Option>
              <Option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</Option>
              <Option value="Asia/Rangoon">(GMT+06:30) Yangon (Rangoon)</Option>
              <Option value="Asia/Bangkok">
                (GMT+07:00) Bangkok, Hanoi, Jakarta
              </Option>
              <Option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</Option>
              <Option value="Asia/Hong_Kong">
                (GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi
              </Option>
              <Option value="Asia/Kuala_Lumpur">
                (GMT+08:00) Kuala Lumpur, Singapore
              </Option>
              <Option value="Asia/Irkutsk">
                (GMT+08:00) Irkutsk, Ulaan Bataar
              </Option>
              <Option value="Australia/Perth">(GMT+08:00) Perth</Option>
              <Option value="Asia/Taipei">(GMT+08:00) Taipei</Option>
              <Option value="Asia/Tokyo">
                (GMT+09:00) Osaka, Sapporo, Tokyo
              </Option>
              <Option value="Asia/Seoul">(GMT+09:00) Seoul</Option>
              <Option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</Option>
              <Option value="Australia/Adelaide">(GMT+09:30) Adelaide</Option>
              <Option value="Australia/Darwin">(GMT+09:30) Darwin</Option>
              <Option value="Australia/Brisbane">(GMT+10:00) Brisbane</Option>
              <Option value="Australia/Canberra">
                (GMT+10:00) Canberra, Melbourne, Sydney
              </Option>
              <Option value="Australia/Hobart">(GMT+10:00) Hobart</Option>
              <Option value="Pacific/Guam">
                (GMT+10:00) Guam, Port Moresby
              </Option>
              <Option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</Option>
              <Option value="Asia/Magadan">
                (GMT+11:00) Magadan, Solomon Is., New Caledonia
              </Option>
              <Option value="Pacific/Auckland">
                (GMT+12:00) Auckland, Wellington
              </Option>
              <Option value="Pacific/Fiji">
                (GMT+12:00) Fiji, Kamchatka, Marshall Is.
              </Option>
              <Option value="Pacific/Tongatapu">(GMT+13:00) Nuku'alofa</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="As early as"
            name="as_early_as"
            rules={[{ required: true, message: 'Start time is required.' }]}
          >
            {/* <Input
              type="text"
              name="as_early_as"
              fields={formData.availability.as_early_as}
              onChange={e =>
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    as_early_as: e.target.value,
                  },
                })
              }
            /> */}
            <TimePicker
              onChange={(e, time) =>
                //console.log('tme', time)
                //console.log('str', timeString);
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    as_early_as: time,
                  },
                })
              }
              initialValues={moment('00:00', 'HH:mm')}
              format={'HH:mm'}
            />
          </Form.Item>
          <Form.Item
            label="As late as"
            name="as_late_as"
            rules={[{ required: true, message: 'End time is required.' }]}
          >
            {/* <Input
              type="text"
              name="as_late_as"
              fields={formData.as_late_as}
              onChange={e =>
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    as_late_as: e.target.value,
                  },
                })
              }
            /> */}
            <TimePicker
              onChange={(e, time) =>
                //console.log('tme', time)
                //console.log('str', timeString);
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    as_late_as: time,
                  },
                })
              }
              initialValues={moment('00:00', 'HH:mm')}
              format={'HH:mm'}
            />
          </Form.Item>
          <Form.Item label="Methods" name="method">
            <Checkbox.Group
              name="method"
              value={formData.method}
              onChange={e => handleCheckboxChange(e)}
            >
              <Checkbox value="phone">Phone</Checkbox>
              <Checkbox value="email">Email</Checkbox>
              <Checkbox value="twitter">Twitter</Checkbox>
              <Checkbox value="facebook">Facebook</Checkbox>
              <Checkbox value="wechat">WeChat</Checkbox>
              <Checkbox value="mail">Mail</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <h4>Additional Information</h4>
          <Form.Item
            name={0}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="My favorite thing to do in my free time is.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={1}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="When I grow up, I want to be.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={2}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Goals and Dreams Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={3}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Personal Struggles Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={4}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Other interests/hobbies.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={5}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Skills Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={6}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Family Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={7}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Other Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={8}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Admin Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    message: state.headmasterReducer.message,
  };
};

export default connect(mapStateToProps, {})(AddMenteeForm);
