import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 300,
    maxWidth: 700
  }
}); 
    
function Leaderboard(props) {
  
    const { classes, users } = props;

    console.log(users)

    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell>Rank (#)</TableCell>
                <TableCell colSpan={2}>User</TableCell>
                <TableCell >Asked</TableCell>
                <TableCell >Answered</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user, index) => {
                return (
                <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell><img className="avatar" src={user.avatarURL} alt={user.name} ></img></TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell >{Object.keys(user.answers).length}</TableCell>
                    <TableCell >{user.questions.length}</TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
        </Paper>
    );
    }

Leaderboard.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

export default withStyles(styles)(Leaderboard);
