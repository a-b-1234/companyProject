import { selectPersonalDetails } from "app/store/selectors";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserDetailsCard } from "./userDetailsCard";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Api } from "api/api";
import { TextField } from "@mui/material";

export const Info = () => {
    const personalDetails: PersonalDetails = useSelector(selectPersonalDetails);
    const [projectDetails, setProjectDetails] = useState<any[]>([]);
    const [filteredProjectDetails, setFilteredProjectDetails] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        Api.info().then((response) => {
            setProjectDetails(response.data.projectList);
            setFilteredProjectDetails(response.data.projectList);
        }).catch(err => {
            //todo
        })
    }, [])

    useEffect(() => {
        const filteredData = projectDetails.filter(p => p.name.startsWith(searchText));
        setFilteredProjectDetails(filteredData);
    }, [searchText])

    const rowClassName = (data) => {
        return (data.score < 70 ?
            'red_class' :
            data.score > 90 ?
                'green_class' :
                ''
        );
    };

    const percentageOfInDadelineProject = useCallback(() => {
        if (filteredProjectDetails.length) {
            const sumOfInDadelineProjects = filteredProjectDetails.filter(x => x.madeDadeline).length;
            return (sumOfInDadelineProjects * 100 / filteredProjectDetails.length).toFixed();
        } else {
            return 0;
        }
    }, [filteredProjectDetails])

    const gpa = useCallback(() => {
        if (filteredProjectDetails.length) {
            let sum = 0;
            filteredProjectDetails.forEach(x => sum += x.score);
            return (sum / filteredProjectDetails.length).toFixed();
        } else {
            return 0;
        }
    }, [filteredProjectDetails])

    return (<>
        <UserDetailsCard personalDetails={personalDetails}></UserDetailsCard>
        <label>{percentageOfInDadelineProject() + `% of made dadeline projects`}</label>
        <br />
        <label>{`grade point average ` + gpa()}</label>
        <br />
        <TextField placeholder="search (by name)" onChange={(e) => setSearchText(e.target.value)}></TextField>
        {/* todo foreach */}
        <DataTable value={filteredProjectDetails} tableStyle={{ minWidth: '50rem' }}
            rowClassName={rowClassName}>
            <Column field="id" header="id"></Column>
            <Column field="name" header="Name" sortable></Column>
            <Column field="score" header="Score" sortable></Column>
            <Column field="durationInDays" header="DurationInDays" sortable></Column>
            <Column field="bugsCount" header="BugsCount" sortable></Column>
            <Column field="madeDadeline" header="MadeDadeline" sortable></Column>
        </DataTable>
    </>
    )
}