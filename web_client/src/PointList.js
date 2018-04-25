import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { PageHeader, Table, Modal, Button } from 'react-bootstrap';
import EvaluationForm from './EvaluationForm';

export default class PointList extends Component {
	constructor(props) {
		super(props);
		let type = localStorage.getItem("type");
		let baseUri = "";
		switch (type) {
			case ("ClassPresident"):
				baseUri = "http://127.0.0.1:3000/api/v1/class_president/evaluation_forms";
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
			baseUri: baseUri,
			evaluationForms: [],
			detailFormShow: false,
			evaluationFormId: null,
			totalEntries: 0,
			sizePerPage: 0
		}
		this.handleDetailFormClose = this.handleDetailFormClose.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
	}

	handleDetailFormClose() {
		this.setState({
			detailFormShow: false
		})
		// window.location.href = "http://127.0.0.1:8088/dashboard";
	}

	onRowClick(row) {
		// console.log(row);
		this.setState({
			evaluationFormId: row.id,
			detailFormShow: true
		})
	}

	onPageChange(page, sizePerPage) {
		// Sending request to server
		let token = localStorage.getItem("tokenId");
		let uri = this.state.baseUri + "?page=" + page;
		fetch(uri, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': "application/json"
			}
		}).then(res => res.json())
			.then((res) => {
				// console.log(res);
				let numberOfForms = res.data.evaluation_forms.length;
				for (let i = 0; i < numberOfForms; i++) {
					if (res.data.evaluation_forms[i].status === "avaiable") {
						res.data.evaluation_forms[i].status = "Đang chờ phê duyệt";
					} else if (res.data.evaluation_forms[i].status === "complete") {
						(res.data.evaluation_forms[i].status = "Đã phê duyệt")
					}
					if (res.data.evaluation_forms[i].classification === "weak") {
						res.data.evaluation_forms[i].classification = "Yếu";
					}
				}
				this.setState({
					evaluationForms: res.data.evaluation_forms,
					sizePerPage: res.data.per_page,
					totalEntries: res.data.total_entries
				})
			})
	}

	componentDidMount() {
		let token = localStorage.getItem("tokenId");
		// alert(`Bearer ${token}`);
		// console.log(this.state)
		let uri = this.state.baseUri + "?page=1"
		fetch(uri, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': "application/json"
			}
		}).then(res => res.json())
			.then((res) => {
				// console.log(res);
				let numberOfForms = res.data.evaluation_forms.length;
				for (let i = 0; i < numberOfForms; i++) {
					if (res.data.evaluation_forms[i].status === "avaiable") {
						res.data.evaluation_forms[i].status = "Đang chờ phê duyệt";
					} else if (res.data.evaluation_forms[i].status === "complete") {
						(res.data.evaluation_forms[i].status = "Đã phê duyệt")
					}
					if (res.data.evaluation_forms[i].classification === "weak") {
						res.data.evaluation_forms[i].classification = "Yếu";
					} else if (res.data.evaluation_forms[i].classification === "medium") {
						res.data.evaluation_forms[i].classification = "Trung bình";
					} else if (res.data.evaluation_forms[i].classification === "middling") {
						res.data.evaluation_forms[i].classification = "Khá";
					} else if (res.data.evaluation_forms[i].classification === "good") {
						res.data.evaluation_forms[i].classification = "Giỏi";
					} else {
						res.data.evaluation_forms[i].classification = "Xuất sắc";
					}
				}
				this.setState({
					evaluationForms: res.data.evaluation_forms,
					sizePerPage: res.data.per_page,
					totalEntries: res.data.total_entries
				})
			})
	}

	render() {
		// console.log(this.state.evaluationForms);
		const options = {
			onRowClick: this.onRowClick,
			sizePerPage: this.state.sizePerPage,
			sizePerPageList: [],
			onPageChange: this.onPageChange
		}
		return (
			<div>
				<PageHeader>Điểm rèn luyện</PageHeader>
				<BootstrapTable striped hover data={this.state.evaluationForms} remote={true} pagination fetchInfo={{ dataTotalSize: this.state.totalEntries }} options={options}>
					<TableHeaderColumn isKey dataField='id' hidden={true}>Mã phiếu đánh giá</TableHeaderColumn>
					<TableHeaderColumn dataField='student_id'>Mã SV</TableHeaderColumn>
					<TableHeaderColumn dataField='semester_id'>Mã học kỳ</TableHeaderColumn>
					<TableHeaderColumn dataField='self_assessment'>Điểm tự đánh giá</TableHeaderColumn>
					<TableHeaderColumn dataField='class_president_assessment'>Điểm cán bộ lớp đánh giá</TableHeaderColumn>
					<TableHeaderColumn dataField='classification'>Xếp loại</TableHeaderColumn>
					<TableHeaderColumn dataField='status'>Trạng thái</TableHeaderColumn>
				</BootstrapTable>

				<Modal show={this.state.detailFormShow} onHide={this.handleDetailFormClose}>
					<Modal.Header closeButton>
						<Modal.Title>Thông tin phiếu đánh giá</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<EvaluationForm evaluationFormId={this.state.evaluationFormId} />
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleDetailFormClose}>Đóng</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}