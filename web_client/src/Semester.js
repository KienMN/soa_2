import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { PageHeader, Button, Modal, Form, FormControl, FormGroup } from 'react-bootstrap';

export default class Semester extends Component {
	constructor(props) {
		super(props)
		this.state = {
			baseUri: "http://127.0.0.1:3000/api/v1/employee/semesters",
			createFormShow: false,
			actionModalShow: false,
			newSemesterTitle: "",
			selectedSemesterId: -1,
			selectedRowIndex: -1,
			currentSelectedStatus: "",
			semesters: [{ status: "initial" }],
			totalEntries: 0,
			sizePerPage: 0
		}
		this.showCreateForm = this.showCreateForm.bind(this);
		this.handleCreateFormClose = this.handleCreateFormClose.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.warningDeleteClose = this.warningDeleteClose.bind(this);
		this.deleteSemester = this.deleteSemester.bind(this);
		this.onChange = this.onChange.bind(this);
		this.closeSemester = this.closeSemester.bind(this);
	}


	// Setting name for new semester
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// Handling showing of creating new semester form
	showCreateForm() {
		this.setState({
			createFormShow: true
		})
	}

	// Handling hiding of creating new semester form
	handleCreateFormClose() {
		this.setState({
			createFormShow: false
		})
	}

	// Creating new semester
	onSubmit(e) {
		e.preventDefault();
		if (this.state.newSemesterTitle !== "") {
			let uri = this.state.baseUri;
			let token = localStorage.getItem("tokenId");
			fetch(uri, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					'Content-Type': "application/json"
				},
				body: JSON.stringify({
					"title": this.state.newSemesterTitle
				})
			}).then(res => res.json())
				.then((res) => {
					console.log(res);
					res.data.status = "Đang mở"
					let newSemesters = this.state.semesters;
					newSemesters.push(res.data);
					this.setState({
						semesters: newSemesters
					})
				})
		}
		this.setState({
			createFormShow: false
		})
	}

	onRowClick(row, columnIndex, rowIndex) {
		let currentStatus = this.state.semesters[rowIndex].status;
		this.setState({
			actionModalShow: true,
			selectedSemesterId: row.id,
			currentSelectedStatus: currentStatus,
			selectedRowIndex: rowIndex
		})
	}

	warningDeleteClose() {
		this.setState({
			actionModalShow: false
		})
	}

	// Deleting selected semester
	deleteSemester(e) {
		e.preventDefault();
		let uri = this.state.baseUri + "/" + this.state.selectedSemesterId;
		let token = localStorage.getItem("tokenId");
		fetch(uri, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': "application/json"
			},
		}).then(res => res.json())
			.then((res) => {
				console.log(res);
				let newSemesters = this.state.semesters;
				newSemesters.splice(this.state.selectedRowIndex, 1)
				this.setState({
					semesters: newSemesters
				})
			})
		this.setState({
			actionModalShow: false
		})
	}

	// Closing selected semester
	closeSemester(e) {
		e.preventDefault();
		let uri = this.state.baseUri + "/" + this.state.selectedSemesterId;
		let token = localStorage.getItem("tokenId");
		let newStatus = 0;
		if (this.state.currentSelectedStatus === "Đang mở") {
			newStatus = 1;
		}
		fetch(uri, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': "application/json"
			},
			body: JSON.stringify({
				status: newStatus
			})
		}).then(res => res.json())
			.then((res) => {
				console.log(res);
				if (res.data.status === "avaiable") {
					res.data.status = "Đang mở"
				} else {
					res.data.status = "Đã đóng"
				}
				let newSemesters = this.state.semesters;
				newSemesters[this.state.selectedRowIndex] = res.data;
				this.setState({
					semesters: newSemesters
				})
			})
		this.setState({
			actionModalShow: false
		})
	}

	// Switching amongs semester pages
	onPageChange(page, sizePerPage) {
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
				this.setState({
					semesters: res.data.semesters,
					sizePerPage: res.data.per_page,
					totalEntries: res.data.total_entries
				})
			})
	}

	// Fetching data before rendering
	componentDidMount() {
		let uri = this.state.baseUri + "?page=1";
		let token = localStorage.getItem("tokenId");
		fetch(uri, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': "application/json"
			}
		}).then(res => res.json())
			.then((res) => {
				let numberOfSemesters = res.data.semesters.length;
				for (let i = 0; i < numberOfSemesters; i++) {
					if (res.data.semesters[i].status === "avaiable") {
						res.data.semesters[i].status = "Đang mở"
					} else {
						res.data.semesters[i].status = "Đã đóng"
					}
				}
				console.log(res);
				this.setState({
					semesters: res.data.semesters,
					sizePerPage: res.data.per_page,
					totalEntries: res.data.total_entries
				})
			})
	}

	render() {
		const options = {
			onRowClick: this.onRowClick,
			sizePerPage: this.state.sizePerPage,
			sizePerPageList: [],
			onPageChange: this.onPageChange
		}
		return (
			<div>
				<PageHeader>Học kỳ {" "}
					<Button bsStyle="danger" onClick={this.showCreateForm}>Tạo học kỳ mới</Button>
				</PageHeader>
				<BootstrapTable striped hover data={this.state.semesters} remote={true} pagination fetchInfo={{ dataTotalSize: this.state.totalEntries }} options={options}>
					<TableHeaderColumn isKey dataField='id'>Mã học kỳ</TableHeaderColumn>
					<TableHeaderColumn dataField='title'>Tên học kỳ</TableHeaderColumn>
					<TableHeaderColumn dataField='status'>Trạng thái</TableHeaderColumn>
				</BootstrapTable>

				<Modal show={this.state.createFormShow} onHide={this.handleCreateFormClose}>
					<Modal.Header closeButton>
						<Modal.Title>Tạo học kỳ mới</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<FormGroup>
								<FormControl
									type="text"
									name="newSemesterTitle"
									value={this.state.newSemesterTitle}
									onChange={this.onChange}
									placeholder="Nhập tên học kỳ mới"
								/>
							</FormGroup>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleCreateFormClose}>Đóng</Button>
						<Button onClick={this.onSubmit} bsStyle="primary">Xác nhận</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.actionModalShow} onHide={this.warningDeleteClose}>
					<Modal.Header closeButton>
						<Modal.Title>Quản lý học kỳ</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Bạn muốn làm gì?</p>
					</Modal.Body>
					<Modal.Footer>
						{(this.state.currentSelectedStatus === "Đang mở") ? <Button onClick={this.closeSemester} bsStyle="warning">Đóng phiếu đánh giá</Button> : <Button onClick={this.closeSemester} bsStyle="warning">Mở phiếu đánh giá</Button>}
						<Button onClick={this.deleteSemester} bsStyle="danger">Xoá</Button>
						<Button onClick={this.warningDeleteClose}>Đóng</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}