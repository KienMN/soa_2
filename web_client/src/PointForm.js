import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

class PointForm extends Component {
	constructor(props) {
		super(props);
		this.handleBlur = this.handleBlur.bind(this);
		// this.onChange = this.onChange.bind(this);
	}

	handleBlur(e) {
		alert(isNaN(parseInt(e.target.value)))
	}

	// onChange(e) {
	// 	alert(typeof (e.target.value) === "")
	// }

	render() {
		return (
			<Form horizontal>
				<div>
					<h4>Kết quả học tập</h4>
				</div>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Kết quả học tập kém</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 3 điểm</HelpBlock>
					</Col>

				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Cảnh báo học vụ</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 5 điểm</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Đăng ký thiếu tín chỉ</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 5 điểm</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Bỏ thi</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 2 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>

				<div>
					<h4>Chấp hành quy định</h4>
				</div>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Nộp hoặc nhận tiền sai</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 5 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Đăng ký học muộn</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 2 điểm</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Vắng mặt trong các buổi triệu tập</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 5 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Trả tài liệu, hồ sơ muộn</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 5 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Vi phạm quy định tại địa phương</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 10 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>


				<div>
					<h4>Các hoạt động ngoại khoá</h4>
				</div>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Tham gia đầy đủ các hoạt động</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Cộng 10 điểm</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Tham gia các hoạt động bên ngoài</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Cộng 2 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Vắng mặt trong các hoạt động</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 2 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>

				<div>
					<h4>Quan hệ cộng đồng</h4>
				</div>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Mất đoàn kết tập thể</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Trừ 5 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>

				<div>
					<h4>Thành tích đặc biệt</h4>
				</div>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Giữ chức vụ quan trọng</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Cộng 10 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={4} >
						<ControlLabel>Đạt giải cao trong các cuộc thi, NCKH</ControlLabel>
					</Col>
					<Col sm={6}>
						<FormControl
							type="number"
							placeholder="Điền điểm"
						/>
						<HelpBlock>Cộng 5 điểm/lần</HelpBlock>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={5} sm={2}>
						<Button type="submit" bsStyle="primary" bsSize="large" block>Xác nhận</Button>
					</Col>

				</FormGroup>


			</Form>
		)
	}
}

export default PointForm;