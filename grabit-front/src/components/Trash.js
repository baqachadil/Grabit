<Grid item xs={12} className={classes.info}>
  <Grid container justify="flex-start">
    <Grid item xs={4}>
      <img
        src={currentUser?.image}
        alt={currentUser?.Name}
        className={classes.userImg}
      />
    </Grid>
    <Grid style={{ paddingTop: 15 }} item xs={8}>
      <span>{currentUser?.Name}</span>
    </Grid>
  </Grid>
</Grid>;


<Grid container className={classes.root}>
      <Grid item xs={6}>
        <Grid container className={classes.listreq}>
          {RequestsList?.map(req => (
            <ExpansionPanel className={classes.request}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>{req.description}</h3>
                <div className={classes.state}>
                  {" "}
                  <span style={{ verticalAlign: "middle" }}>{req.State}</span>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.reqBody}>
                <Typography>
                  <span>
                    <strong>Items :</strong>
                  </span>
                  {req.item_list.map(item => (
                    <span>{item},</span>
                  ))}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Grid>
      </Grid>
    </Grid>

root: {
  marginTop: 50,
  width: 825,
  height: 592,
  backgroundColor: "white"
},
request: {
  width: "100%"
},
listreq: {
  maxHeight: "100%",
  overflowY: true
},
state: {
  position: "absolute",
  right: 70,
  bottom: 30,
  width: 70,
  borderRadius: 4,
  backgroundColor: "red",
  color: "white",
  textAlign: "center"
}
