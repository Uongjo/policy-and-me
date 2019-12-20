import React from "react"
import renderer from "react-test-renderer"
import {BrowserRouter} from "react-router-dom"
import {About, Splash, Bills, InterestGroups, Legislators} from "../pages"
import {Bill, InterestGroup, Legislator, Person, Pagination, NavBar, Search, highlightSearch} from "../components"
import {configure, shallow, mount} from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
import {createMount} from '@material-ui/core/test-utils'



configure({ adapter: new Adapter() });

describe("Components did load normally", () => {

    const emptySearch = ""

    // Test 1: Check Bill component
    it("Bill loads normally", () => {
        // short_title, introduced_date, primary_subject, sponsor_name, committees
        const bill = {short_title: "Bill-1", introduced_date: "1999", primary_subject: "Saftey", sponsor_name: "Joe", committees: "ABC"}
        const tree = renderer.create(<Bill bill = {bill} searchValue = {emptySearch} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 2: Check InterestGroup component
    it("InterestGroup loads normally", () => {
        // name, address, city, phone, email, 
        const ig = {name:"Test", address: "123 Test Ave", city: "Somewhere", phone:"111-111-1111", email: "test@google.com"}
        const tree = renderer.create(<InterestGroup interestGroup = {ig} searchValue = {emptySearch}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 3: Check Legislator component
    it("Legislator loads normally", () => {
        // first_name, last_name, title, party, gender, state
        const leg = {first_name:"First", last_name: "Last", title: "1st Class", party:"D", gender: "M", state: "TX"}
        const tree = renderer.create(<Legislator legislator = {leg} searchValue = {emptySearch}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 4: Check person component
    it("Person loads normally", () => {
        const tree = renderer.create(<Person/>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 5: check NavBar component
    it("NavBar loads normally", () =>{
        const tree = renderer.create(<BrowserRouter><NavBar/></BrowserRouter>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    
    // Test 6: check pagination component
    it("Pagination loads normally", () =>{
        // setPageIndex, numPages
        const pagin = {setPageIndex: 0, numPages: 10}
        const tree = renderer.create(<Pagination {...pagin}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe("pages did load normally", () => {

    // Test 7: check about page 
    it("About did load normally", () => {
        const tree = renderer.create(<About/>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 8: check bills page
    it("Bills did load normally", () => {
        const defaultProps = {
            match: { params: { id: undefined } }
        };
        const tree = renderer.create(<Bills {...defaultProps} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 9: check legislator page
    it("Legislators did load normally", () => {
        const defaultProps = {
            match: { params: { id: undefined } }
        };
        const tree = renderer.create(<Legislators {...defaultProps} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 10: check interestgroup page
    it("InterestGroups did load normally", () => {
        const defaultProps = {
            match: { params: { id: undefined } }
        };
        const tree = renderer.create(<InterestGroups {...defaultProps} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

})

describe("Search, Sort, Filter", () => {

    const searchProps = {setModel: [],
        model: "sigs",
        setSearchValue: "",
        sortOptions: { name: "Name" },
        filterOptions: { state: "State" } ,
        setFilterKey: "",
        setFilterValue: "",
        setPageIndex: 0
    }

    // Test 11: check splash page
    it("Splash did load normally", () => {
        const tree = renderer.create(<BrowserRouter><Splash/></BrowserRouter>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 12: check Search component
    it("Search loads normally", () =>{
        const tree = renderer.create(<BrowserRouter><Search {...searchProps}/></BrowserRouter>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 13: check highlight
    it("Highlight did load normally", () => {
        const instance = {name: "bill", last: "clinton", state: "TX"}
        const searchValue = "bill"
        const tree = renderer.create(<highlightSearch instance = {instance} searchValue = {searchValue}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Test 14: Check search loads initial state correctly
    it("Search loads props correctly", () =>{
        const wrapper = shallow(<Search {...searchProps}/>)
        const state = {
            sortValue: "",
            searchValue: "",
            filterKey: "",
            filterValue: "",
        }
        expect(wrapper.state()).toEqual(state)
    })

    // Test 15: check sort value is updated
    it("sort by is updated correctly", () =>{
        const wrapper = mount(<Search {...searchProps}/>)
        wrapper.find("select").at(0).simulate("change", {target: {value: "name"} })
        expect(wrapper.state().sortValue).toEqual("name")
    })

    // Test 16: Check filter value is updated
    it("filter by is updated correctly", () =>{
        const wrapper = mount(<Search {...searchProps}/>)
        wrapper.find("select").at(1).simulate("change", {target: {value: "state"} })
        expect(wrapper.state().filterKey).toEqual("state")
    })

    // Test 17: Check search value is updated
    it("Search value is updated correctly", () =>{
        const mount = createMount({dive: true})
        const wrapper = mount(<Search {...searchProps}/>)
        wrapper.find("input").at(0).simulate("change", {target: {value: "Adams"} })
        expect(wrapper.state().searchValue).toEqual("Adams")
    })

    // Test 18: Check filter value is updated
    it("filter value is updated correctly", () =>{
        const mount = createMount({dive: true})
        const wrapper = mount(<Search {...searchProps}/>)
        wrapper.find("input").at(1).simulate("change", {target: {value: "State"} })
        expect(wrapper.state().filterValue).toEqual("State")
    })

    // Test 19: Check filter by and filter value work together
    it("filter by and filter value update", () =>{
        const mount = createMount({dive: true})
        const wrapper = mount(<Search {...searchProps}/>)
        wrapper.find("select").at(1).simulate("change", {target: {value: "State"} })
        wrapper.find("input").at(1).simulate("change", {target: {value: "TX"} })
        expect(wrapper.state().filterValue).toEqual("TX")
        expect(wrapper.state().filterKey).toEqual("State")
    })

    // Test 20: Check sort and search
    it("Search and sort update correctly", () =>{
        const mount = createMount({dive: true})
        const wrapper = mount(<Search {...searchProps}/>)
        wrapper.find("input").at(0).simulate("change", {target: {value: "Joe"} })
        wrapper.find("select").at(0).simulate("change", {target: {value: "Name"} })
        expect(wrapper.state().searchValue).toEqual("Joe")
        expect(wrapper.state().sortValue).toEqual("Name")
    })
})