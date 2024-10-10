import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import NioButton from "../NioButton/NioButton";
const styles = theme => ({
  root: {
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  input: {
    display: "none"
  },
  img: {
    width: 100,
    height: 100,
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

class ImageUploadCard extends React.Component {
  state = {
    mainState: "initial",
    selectedFiles: [], // array to store selected files
    imagesUploaded: []
  };

  handleUploadClick = event => {
    const files = Array.from(event.target.files);

    // Update selectedFiles state
    this.setState(prevState => ({
      selectedFiles: [...prevState.selectedFiles, ...files]
    }));

    // Display selected images immediately
    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState(prevState => ({
          imagesUploaded: [...prevState.imagesUploaded, reader.result]
        }));
      };
    });
  };

  renderInitialState() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        {this.state.imagesUploaded.map((image, index) => (
          <Grid item key={index}>
            <img className={classes.img} src={image} alt={`Uploaded ${index}`} />
          </Grid>
        ))}
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span"  style={{ width: "100%", backgroundColor: '#664DE5', border: 'none', color: 'white' }}
>
            Select Image(s)
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
          </Button>
        </label>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={this.props.cardName}>
          {this.renderInitialState()}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
