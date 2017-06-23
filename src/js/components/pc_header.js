import React from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon,Tabs,Form,message,Input,Button,CheckBox,Modal} from 'antd';

const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
 class PCHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible:false,
			action:'login',
			hasLogined:false,
			userNickName:'',
			userId:0
		};
	};
	setModalVisible(value){
			this.setState({modalVisible:value});
	};
	handlClick(e){
		if(e.key=='register'){
			this.setState({current:'register'});
			this.setModalVisible(true);
		}
		else{
			this.setState({current:e.key});
		}
	};
	handleSubmit(e){
		e.preventDefault();
		var myFetchOptions ={
			method:'GET'
		};
		var formData = this.props.form.getFieldsValue();
		fetch('http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmpassword+"',myFetchOptions)
		.then(response=>response.json())
		.then(json=>this.setState({userNickName:json.NickUserName,userId:json.userId}));
		message.success('请求成功');
		this.setModalVisible(false);
		if(this.state.action=='login'){
			this.setState({hasLogined:true});
		}
	};
	callback(key){
		if(key==1){
			this.setState({action:'login'});
		}
		else if(key==2){
			this.setState({action:'register'});
		}
	};
	render() {
		let { getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined
		?
		<Menu.Item key="logout" className="register">
			<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
			&nbsp;&nbsp;
			<Link target="_blank">
				<Button type="dashed" htmlType="button">个人中心</Button>
			</Link>
			&nbsp;&nbsp;
			<Button type="ghost" htmlType="button">退出</Button>
		</Menu.Item>
		:
		<Menu.Item key="register">
			<Icon type="appstore"/>注册/登录
		</Menu.Item>
		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handlClick.bind(this)}>
							<Menu.Item key="top">
								<Icon type="appstore"/>头条
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="appstore"/>社会
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>科技
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="appstore"/>时尚
							</Menu.Item>
							{userShow}
						</Menu>
						<Modal
				          title="用户中心" warpClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)}>
				          	<Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} type="card" animated="true">
				          		<TabPane tab="登录" key="1">
							    	<Form layout="horizontal">
										<FormItem lable="账户">
											 {getFieldDecorator('userName', {
									            rules: [{ required: true, message: 'Please input your username!' }],
									          })(
									            <Input placeholder="Username" />
									          )}
										</FormItem>
										<FormItem lable="密码">
											{getFieldDecorator('password', {
									            rules: [{ required: true, message: 'Please input your username!' }],
									          })
									          (
									            <Input placeholder="password" />
									          )
									      }
										</FormItem>
										<Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>登录</Button>
							    	</Form>
							    </TabPane>
							    <TabPane tab="注册" key="2">
							    	<Form layout="horizontal">
										<FormItem lable="账户">
											 {getFieldDecorator('r_userName', {
									            rules: [{ required: true, message: 'Please input your username!' }],
									          })(
									            <Input placeholder="Username" />
									          )}
										</FormItem>
										<FormItem lable="密码">
											{getFieldDecorator('r_password', {
									            rules: [{ required: true, message: 'Please input your username!' }],
									          })
									          (
									            <Input placeholder="password" />
									          )
									      }
										</FormItem>
										<FormItem lable="确认密码">
											{getFieldDecorator('r_confirmpassword', {
									            rules: [{ required: true, message: 'Please input your username!' }],
									          })(
									            <Input placeholder="password again" />
									          )}
										</FormItem>
										<Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>注册</Button>
							    	</Form>
							    </TabPane>
							   
							    
							  </Tabs>
				        </Modal>


					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}
export default PCHeader = Form.create()(PCHeader);
