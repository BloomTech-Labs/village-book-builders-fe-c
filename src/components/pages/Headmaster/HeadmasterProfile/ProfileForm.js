import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { axiosWithAuth } from '../../../../utils/axiosWithAuth';

import { Form, Input, Radio, Upload, Avatar, message, Select } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { editHeadmasterProfile } from '../../../../state/actions';
import { debugLog } from '../../../../utils/debugMode';
import { Button } from 'antd';

// const baseURL = 'https://cors-anywhere.herokuapp.com/http://54.158.134.245/api';

const initialState = {
  first_name: '',
  gender: {
    male: false,
    female: false,
    other: false,
  },
  address: '',
  email: '',
  bio: '',
  communication_app: '',
  dob: '',
  general_availability: '',
  goals_mentor_program: '',
  goals_personal: '',
  goals_school_community: '',
  mentor_advisor_point_of_contact: '',
  phone_number: '',
  photo_url: '',
  programId: '',
  registration_status: '',
  last_name: '',
  time_zone: '',
  villageId: '',
  headmasters_picture: '',
};

const ProfileForm = props => {
  const [formData, setFormData] = useState(initialState);
  const [value, setValue] = useState(1);
  const params = useParams().id;
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    axiosWithAuth()
      .get(`/headmaster/1`)
      .then(res => {
        form.setFieldsValue(res.data);
        setFormData(res.data);
      })
      .catch(err => console.dir(err));
  }, [form]);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(formData);
    props.editHeadmasterProfile(params, formData);
  };

  const handleChange = e => {
    debugLog(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const uploadProfilePic = {
    name: 'file',
    action: '', /// Link action with backend
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="form-container">
      <Form>
        <h1 className="page-title">Edit Your Profile</h1>
        <Form.Item>
          <Link to="/profile">Go Back</Link>
        </Form.Item>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item>
            <Avatar shape="square" size={84} icon={<UserOutlined />} />
            <Upload {...uploadProfilePic}>
              <Button icon={<UploadOutlined />}>Edit Profile Picture</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'First Name is required.' }]}
          >
            <Input
              type="text"
              name="first_name"
              defaultValue={formData.first_name} // Change this
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

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required.' }]}
          >
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Timezone"
            name="time_zone"
            value={formData.time_zone}
            rules={[{ required: true, message: 'Time is required.' }]}
          >
            <Select
              onChange={e =>
                setFormData({
                  ...formData,
                  time_zone: e,
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
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Address is required.' }]}
          >
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[{ required: true, message: 'Phone Number is required.' }]}
          >
            <Input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Male</Radio>
              <Radio value={2}>Female</Radio>
              <Radio value={3}>Other</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Bio"
            name="bio"
            rules={[{ required: true, message: 'Bio is required.' }]}
          >
            <Input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item>
            <p>Fields with * are required.</p>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Form>
    </div>
  );
};

export default connect(null, { editHeadmasterProfile })(ProfileForm);
