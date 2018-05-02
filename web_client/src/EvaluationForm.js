import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ButtonToolbar, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Comment from './Comment';

export default class EvaluationForm extends Component {
	constructor(props) {
		super(props);
		// Determining the type of user
		let type = localStorage.getItem("type");
		let baseUri = "";
		switch (type) {
			case ("ClassPresident"):
				baseUri = "http://127.0.0.1:3000/api/v1/class_president/evaluation_forms"
				break
			case ("Adviser"):
				baseUri = "http://127.0.0.1:3000/api/v1/adviser/evaluation_forms"
				break
			case ("Employee"):
				baseUri = "http://127.0.0.1:3000/api/v1/employee/evaluation_forms"
				break
			default:
				baseUri = "http://127.0.0.1:3000/api/v1/student/evaluation_forms"
		}
		this.state = {
			evaluationFormId: this.props.evaluationFormId,
			editable: false,
			studyResult: 0,
			regulations: 0,
			activities: 0,
			publicRelationship: 0,
			specialAchievement: 0,
			selfAssessment: 0,
			classification: "",
			status: "avaiable",
			baseUri: baseUri,
			semesterTitle: "",
			newComment: "",
			comments: [],
			poorResult: 0,
			warning: 0,
			notEnoughCredits: 0,
			examSkip: 0,
			wrongPayment: 0,
			lateCourseRegistration: 0,
			absence: 0,
			lateReturn: 0,
			localRegulations: 0,
			fullParticipation: 0,
			additionActivities: 0,
			activitiesAbsence: 0,
			disunity: 0,
			importantPosition: 0,
			highCompetitionResult: 0,
			poorResultScore: 0,
			warningScore: 0,
			notEnoughCreditsScore: 0,
			examSkipScore: 0,
			wrongPaymentScore: 0,
			lateCourseRegistrationScore: 0,
			absenceScore: 0,
			lateReturnScore: 0,
			localRegulationsScore: 0,
			fullParticipationScore: 0,
			additionActivitiesScore: 0,
			activitiesAbsenceScore: 0,
			disunityScore: 0,
			importantPositionScore: 0,
			highCompetitionResultScore: 0
		}

		this.changeEditable = this.changeEditable.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCommentChange = this.onCommentChange.bind(this);
		this.postComment = this.postComment.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleBlur(e) {
		// alert(e.target.max === "");
		if (isNaN(parseInt(e.target.value, 10)) || e.target.value === "") {
			alert("Vui lòng nhập lại điểm")
			this.setState({
				[e.target.name]: 0
			})
		}
		if (e.target.max !== "") {
			let point = parseInt(e.target.value, 10);
			if (point > e.target.max) {
				alert("Số lần không vượt quá " + e.target.max);
				this.setState({
					[e.target.name]: 0
				})
			}
		}
		if (e.target.min !== "") {
			let point = parseInt(e.target.value, 10);
			if (point < e.target.min) {
				alert("Số lần không nhỏ hơn " + e.target.min);
				this.setState({
					[e.target.name]: 0
				})
			}
		}
	}

	// Handling comment changing
	onCommentChange(e) {
		this.setState({
			newComment: e.target.value
		})
	}

	// Handling comment posting
	postComment(e) {
		// e.preventDefault();
		let type = localStorage.getItem("type");
		let token = localStorage.getItem("tokenId");
		let commentUri = "";
		switch (type) {
			case ("ClassPresident"):
				commentUri = "http://127.0.0.1:3000/api/v1/class_president/comments"
				break
			case ("Adviser"):
				commentUri = "http://127.0.0.1:3000/api/v1/adviser/comments"
				break
			case ("Employee"):
				commentUri = "http://127.0.0.1:3000/api/v1/employee/comments"
				break
			default:
				commentUri = "http://127.0.0.1:3000/api/v1/student/comments"
		}
		fetch(commentUri, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': "application/json"
			},
			body: JSON.stringify({
				'content': this.state.newComment,
				'evaluation_form_id': this.state.evaluationFormId
			})
		})
			.then(res => res.json())
			.then((res) => { 
				console.log(res);
				let newComments = this.state.comments;
				newComments.push(res.data);
				this.setState({
					newComment: "",
					comments: newComments
				})
			})
	}

	// Enabling or disabling editable fields
	changeEditable(e) {
		e.preventDefault();
		if (this.state.status === "avaiable") {
			this.setState({
				editable: !this.state.editable,
			})
		} else {
			alert("Không thể sửa do phiếu đã được duyệt hoặc đã đóng");
		}
	}

	// Handling fields changing
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	// Submiting, depends on type of user
	onSubmit() {
		let token = localStorage.getItem("tokenId");
		let type = localStorage.getItem("type");
		let uri = this.state.baseUri + "/" + this.state.evaluationFormId;
		// console.log(this.state);
		if (type === "Student") {
			fetch(uri, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
					'Content-Type': "application/json"
				},
				body: JSON.stringify({
					"target_assignment": {
						"study_result": {
							"sub_fields": {
								"poor_result": parseInt(this.state.poorResult, 10),
								"warning": parseInt(this.state.warning, 10),
								"not_enough_credits": parseInt(this.state.notEnoughCredits, 10),
								"exam_skip": parseInt(this.state.examSkip, 10)
							}
						},
						"regulations": {
							"sub_fields": {
								"wrong_payment": parseInt(this.state.wrongPayment, 10),
								"late_course_registration": parseInt(this.state.lateCourseRegistration, 10),
								"absence": parseInt(this.state.absence, 10),
								"late_return": parseInt(this.state.lateReturn, 10),
								"local_regulations": parseInt(this.state.localRegulations, 10)
							}
						},
						"activities": {
							"sub_fields": {
								"full_participation": parseInt(this.state.fullParticipation, 10),
								"addition_activities": parseInt(this.state.additionActivities, 10),
								"activities_absence": parseInt(this.state.activitiesAbsence, 10),
							}
						},
						"public_relationship": {
							"sub_fields": {
								"disunity": parseInt(this.state.disunity, 10)
							}
						},
						"special_achivement": {
							"sub_fields": {
								"important_position": parseInt(this.state.importantPosition, 10),
								"high_competion_result": parseInt(this.state.highCompetitionResult, 10)
							}
						}
					}
				})
			}).then(res => res.json())
				.then((res) => {
					// console.log(res);
					if (res.code === 1) {
						alert("Cập nhật điểm thành công");
					} else {
						alert("Đã xảy ra lỗi, vui lòng thử lại sau");
					}
				})
		} else if (type === "ClassPresident") {
			fetch(uri, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
					'Content-Type': "application/json"
				},
				body: JSON.stringify({
					"target_assignment": {
						"study_result": {
							"sub_fields": {
								"poor_result": parseInt(this.state.poorResult, 10),
								"warning": parseInt(this.state.warning, 10),
								"not_enough_credits": parseInt(this.state.notEnoughCredits, 10),
								"exam_skip": parseInt(this.state.examSkip, 10)
							}
						},
						"regulations": {
							"sub_fields": {
								"wrong_payment": parseInt(this.state.wrongPayment, 10),
								"late_course_registration": parseInt(this.state.lateCourseRegistration, 10),
								"absence": parseInt(this.state.absence, 10),
								"late_return": parseInt(this.state.lateReturn, 10),
								"local_regulations": parseInt(this.state.localRegulations, 10)
							}
						},
						"activities": {
							"sub_fields": {
								"full_participation": parseInt(this.state.fullParticipation, 10),
								"addition_activities": parseInt(this.state.additionActivities, 10),
								"activities_absence": parseInt(this.state.activitiesAbsence, 10),
							}
						},
						"public_relationship": {
							"sub_fields": {
								"disunity": parseInt(this.state.disunity, 10)
							}
						},
						"special_achivement": {
							"sub_fields": {
								"important_position": parseInt(this.state.importantPosition, 10),
								"high_competion_result": parseInt(this.state.highCompetitionResult, 10)
							}
						}
					}
				})
			}).then(res => res.json())
				.then((res) => {
					// console.log(res);
					if (res.code === 1) {
						alert("Cập nhật điểm thành công");
					} else {
						alert("Đã xảy ra lỗi, vui lòng thử lại sau");
					}
				}, (err) => {
					alert("Vui lòng nhập lại điểm")
				}
				)

			let confirmationUri = this.state.baseUri + "/confirmation/?id=" + this.state.evaluationFormId
			fetch(confirmationUri, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
					'Content-Type': "application/json"
				},
			}).then(res => res.json())
				.then((res) => {
					console.log(res);
					if (res.code === 1) {
						alert("Xác nhận thành công");
					} else {
						alert("Đã xảy ra lỗi, vui lòng thử lại sau");
					}
				}, (err) => {
					console.log(err);
					alert("Đã xảy ra lỗi, vui lòng thử lại sau");
				}
				)
		} else if (type === "Adviser") {
			let confirmationUri = this.state.baseUri + "/confirmation/?id=" + this.state.evaluationFormId
			fetch(confirmationUri, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
					'Content-Type': "application/json"
				},
			}).then(res => res.json())
				.then((res) => {
					console.log(res);
					if (res.code === 1) {
						alert("Xác nhận thành công");
					} else {
						alert("Đã xảy ra lỗi, vui lòng thử lại sau");
					}
				}, (err) => {
					console.log(err);
					alert("Đã xảy ra lỗi, vui lòng thử lại sau");
				}
				)
		} else if (type === "Employee") {
			let confirmationUri = this.state.baseUri + "/confirmation/?id=" + this.state.evaluationFormId
			fetch(confirmationUri, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
					'Content-Type': "application/json"
				},
			}).then(res => res.json())
				.then((res) => {
					console.log(res);
					if (res.code === 1) {
						alert("Xác nhận thành công");
					} else {
						alert("Đã xảy ra lỗi, vui lòng thử lại sau");
					}
				}, (err) => {
					console.log(err);
					alert("Đã xảy ra lỗi, vui lòng thử lại sau");
				}
				)
		}
	}

	// Fetching data before rendering
	componentDidMount() {
		let token = localStorage.getItem("tokenId");
		// alert(`Bearer ${token}`);
		let uri = this.state.baseUri + "/" + this.state.evaluationFormId;
		fetch(uri, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': "application/json"
			}
		}).then(res => res.json())
			.then((res) => {
				console.log(res)
				this.setState({
					studyResult: res.data.evaluation_form.target_assignment.study_result.score,
					regulations: res.data.evaluation_form.target_assignment.regulations.score,
					activities: res.data.evaluation_form.target_assignment.activities.score,
					publicRelationship: res.data.evaluation_form.target_assignment.public_relationship.score,
					specialAchievement: res.data.evaluation_form.target_assignment.special_achivement.score,
					classification: res.data.evaluation_form.classification,
					selfAssessment: res.data.evaluation_form.self_assessment,
					semesterTitle: res.data.semester.title,
					comments: res.data.comments,
					status: res.data.evaluation_form.status,
					poorResult: res.data.evaluation_form.target_assignment.study_result.sub_fields.poor_result.score/3,
					warning: res.data.evaluation_form.target_assignment.study_result.sub_fields.warning.score/5,
					notEnoughCredits: res.data.evaluation_form.target_assignment.study_result.sub_fields.not_enough_credits.score/5,
					examSkip: res.data.evaluation_form.target_assignment.study_result.sub_fields.exam_skip.score/2,
					wrongPaymentScore: res.data.evaluation_form.target_assignment.regulations.sub_fields.wrong_payment.score,
					lateCourseRegistrationScore: res.data.evaluation_form.target_assignment.regulations.sub_fields.late_course_registration.score,
					absenceScore: res.data.evaluation_form.target_assignment.regulations.sub_fields.absence.score,
					lateReturnScore: res.data.evaluation_form.target_assignment.regulations.sub_fields.late_return.score,
					localRegulationsScore: res.data.evaluation_form.target_assignment.regulations.sub_fields.local_regulations.score,
					fullParticipationScore: res.data.evaluation_form.target_assignment.activities.sub_fields.full_participation.score,
					additionActivitiesScore: res.data.evaluation_form.target_assignment.activities.sub_fields.addition_activities.score,
					activitiesAbsenceScore: res.data.evaluation_form.target_assignment.activities.sub_fields.activities_absence.score,
					disunityScore: res.data.evaluation_form.target_assignment.public_relationship.sub_fields.disunity.score,
					importantPositionScore: res.data.evaluation_form.target_assignment.special_achivement.sub_fields.important_position.score,
					highCompetitionResultScore: res.data.evaluation_form.target_assignment.special_achivement.sub_fields.high_competion_result.score
				})
			})
	}

	render() {
		let type = localStorage.getItem("type");
		let editButton = <div></div>
		if (type === "Student" || type === "ClassPresident") {
			editButton = (this.state.editable) ? <Button bsStyle="warning" onClick={this.changeEditable}>Xong</Button> : <Button bsStyle="warning" onClick={this.changeEditable}>Sửa</Button>
		}

		const view = (
			<div>
				<h3>Học kỳ: {this.state.semesterTitle}</h3>
				<hr />
				{/* Evaluation form part */}
				<Form horizontal>
					<FormGroup>
						<Col sm={4} smOffset={1}>
							<ControlLabel>Kết quả học tập</ControlLabel>
						</Col>
						<Col sm={5}>
							<FormControl
								type="number"
								name="studyResult"
								value={this.state.studyResult}
								onChange={this.onChange}
								disabled={true}
							/>
							<HelpBlock>Tối đa 30 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Kết quả học tập kém</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								onBlur={this.handleBlur}
								value={this.state.poorResult}
								onChange={this.onChange}
								name="poorResult"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 3 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Cảnh báo học vụ</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.warning}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="warning"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 5 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Đăng ký thiếu tín chỉ</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.notEnoughCredits}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="notEnoughCredits"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 5 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Bỏ thi</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.examSkip}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="examSkip"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 2 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={1}>
							<ControlLabel>Chấp hành quy định</ControlLabel>
						</Col>
						<Col sm={5}>
							<FormControl
								type="number"
								name="regulations"
								value={this.state.regulations}
								disabled={true}
							/>
							<HelpBlock>Tối đa 25 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Nộp hoặc nhận tiền sai</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.wrongPayment}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="wrongPayment"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 5 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Đăng ký học muộn</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.lateCourseRegistration}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="lateCourseRegistration"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 2 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Vắng mặt trong các buổi triệu tập</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								onBlur={this.handleBlur}
								value={this.state.absence}
								onChange={this.onChange}
								name="absence"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 5 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Trả tài liệu, hồ sơ muộn</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.lateReturn}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="lateReturn"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 5 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Vi phạm quy định tại địa phương</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.localRegulations}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="localRegulations"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 10 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={1}>
							<ControlLabel>Các hoạt động ngoại khoá</ControlLabel>
						</Col>
						<Col sm={5}>
							<FormControl
								type="number"
								name="activities"
								value={this.state.activities}
								disabled={true}
							/>
							<HelpBlock>Tối đa 20 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Tham gia đầy đủ các hoạt động</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.fullParticipation}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="fullParticipation"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Cộng 10 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Tham gia các hoạt động bên ngoài</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								value={this.state.additionActivities}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="additionActivities"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Cộng 2 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Vắng mặt trong các hoạt động</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								value={this.state.activitiesAbsence}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="activitiesAbsence"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 2 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={1}>
							<ControlLabel>Quan hệ cộng đồng</ControlLabel>
						</Col>
						<Col sm={5}>
							<FormControl
								type="number"
								name="publicRelationship"
								value={this.state.publicRelationship}
								disabled={true}
							/>
							<HelpBlock>Tối đa 15 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Mất đoàn kết tập thể</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.disunity}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="disunity"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Trừ 5 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={1}>
							<ControlLabel>Thành tích đặc biệt</ControlLabel>
						</Col>
						<Col sm={5}>
							<FormControl
								type="number"
								name="specialAchievement"
								value={this.state.specialAchievement}
								disabled={true}
							/>
							<HelpBlock>Tối đa 10 điểm</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Giữ chức vụ quan trọng</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.importantPosition}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="importantPosition"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Cộng 10 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col sm={4} smOffset={2}>
							<ControlLabel>Đạt giải cao trong các cuộc thi, NCKH</ControlLabel>
						</Col>
						<Col sm={4}>
							<FormControl
								type="number"
								min={0}
								max={1}
								value={this.state.highCompetitionResult}
								onChange={this.onChange}
								onBlur={this.handleBlur}
								name="highCompetitionResult"
								disabled={!this.state.editable}
							/>
							<HelpBlock>Cộng 5 điểm/lần</HelpBlock>
						</Col>
					</FormGroup>

					<ButtonToolbar>
						<Button bsStyle="primary" onClick={this.onSubmit} disabled={this.state.editable}>Xác nhận</Button>
						{editButton}
					</ButtonToolbar>
				</Form>
				<hr />
				{/* Comment part */}
				<h3>Bình luận</h3>
				<hr />
				{this.state.comments.map((comment) => <Comment key={comment.id} user={comment.username} content={comment.content} createdAt={comment.created_at}/>)}
				<textarea placeholder="Viết bình luận..." className="form-control" rows="3" onChange={this.onCommentChange} value={this.state.newComment}></textarea>
				<ButtonToolbar>
					<Button bsStyle="primary" onClick={this.postComment}>Bình luận</Button>
				</ButtonToolbar>
			</div>
		)
		return (
			<div>
				{view}
			</div>
		)
	}
}