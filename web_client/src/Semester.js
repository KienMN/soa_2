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
			warningDeleteShow: false,
			newSemesterTitle: "",
			deleteSemesterId: -1,
			semesters: [],
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
	}

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
				})
		}
		this.setState({
			createFormShow: false
		})
	}

	onRowClick(row) {
		this.setState({
			warningDeleteShow: true,
			deleteSemesterId: row.id
		})
	}

	warningDeleteClose() {
		this.setState({
			warningDeleteShow: false
		})
	}

	// Deleting selected semester
	deleteSemester(e) {
		e.preventDefault();
		let uri = this.state.baseUri + "/" + this.state.deleteSemesterId;
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
			})
		this.setState({
			warningDeleteShow: false
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

				<Modal show={this.state.warningDeleteShow} onHide={this.warningDeleteClose}>
					<Modal.Header closeButton>
						<Modal.Title>Xoá học kỳ</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Xoá học kỳ này. Bạn chắc chứ?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.warningDeleteClose}>Đóng</Button>
						<Button onClick={this.deleteSemester} bsStyle="danger">Xoá</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}