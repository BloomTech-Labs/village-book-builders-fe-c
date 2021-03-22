import React, { useState, useEffect } from 'react';
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
//import { debugLog } from '../../../../utils/debugMode';
import {
  fetchMenteeProfile as fetchMenteeProfileAction,
  editMenteeProfile as editMenteeProfileAction,
} from '../../../../state/actions';
import '../../../../style.css';

const EditMenteeForm = ({
  currentMentee,
  isLoading,
  message,
  onedit,
  loading,
}) => {
  //   debugLog(
  //     'Prop drilled from Mentees.js',
  //     currentMentee,
  //     moment.utc(currentMentee.dob).format('dddd, MMMM Do of YYYY')
  //   );
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(currentMentee);
  const { Option } = Select;

  useEffect(() => {
    setFormData(currentMentee);
    form.setFieldsValue({
      first_name: currentMentee.first_name,
      last_name: currentMentee.last_name,
      gender: currentMentee.gender,
      email: currentMentee.email,
      dob: moment(currentMentee.dob),
      english_lvl: currentMentee.english_lvl,
      math_lvl: currentMentee.math_lvl,
      reading_lvl: currentMentee.reading_lvl,
      school_lvl: currentMentee.school_lvl,
      academic_description: currentMentee.academic_description,
      support_needed: currentMentee.academic_description,
      primary_language: currentMentee.primary_language,
      time_zone: currentMentee.availability.time_zone,
      as_early_as: moment(currentMentee.availability.as_early_as, 'HH:mm'),
      as_late_as: moment(currentMentee.availability.as_late_as, 'HH:mm'),
      0: currentMentee.dynamic_questions[0].answer,
      1: currentMentee.dynamic_questions[1].answer,
      2: currentMentee.dynamic_questions[2].answer,
      3: currentMentee.dynamic_questions[3].answer,
      4: currentMentee.dynamic_questions[4].answer,
      5: currentMentee.dynamic_questions[5].answer,
      6: currentMentee.dynamic_questions[6].answer,
      7: currentMentee.dynamic_questions[7].answer,
      8: currentMentee.dynamic_questions[8].answer,
    });
  }, [currentMentee, form]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e, i) => {
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
    await onedit(formData);
    form.resetFields();
  };

  //console.log('current in edit form', currentMentee);
  //console.log('formData', formData);
  //console.log('methods', currentMentee.availability.methods);

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'First Name is required.' }]}
          >
            <Input
              type="text"
              name="first_name"
              value={currentMentee ? currentMentee.first_name : ''}
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
            rules={[{ required: true, message: 'Phone Number is required.' }]}
          >
            <Input
              type="text"
              name="primary_language"
              value={formData.primary_language}
              onChange={e => handleChange(e)}
            />
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
            name="time_zone"
            rules={[{ required: true, message: 'Timezone is required.' }]}
          >
            {/* <Input
              type="text"
              name="time_zone"
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
              initialValues={moment(
                currentMentee.availability.as_early_as,
                'HH:mm'
              )}
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
              initialValues={moment(
                currentMentee.availability.as_late_as,
                'HH:mm'
              )}
              format={'HH:mm'}
            />
          </Form.Item>
          <Form.Item label="Methods" name="method">
            <Checkbox.Group
              name="methods"
              values={currentMentee.availability.methods}
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
              Update
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
    message: state.menteeReducer.message,
  };
};

export default connect(mapStateToProps, {
  fetchMenteeProfileAction,
  editMenteeProfileAction,
})(EditMenteeForm);
