import React from 'react';
import './App.css';

const TEST_JSON = [
{
  name:"001",
  children:[{
    name:"002",
    children:[{
      name:"003",
      children:[{
        name:"004",
        children:[{
          name:"005",
          children:[{
            name:"006",
            children:[]}
            ],
          },
          {
            name:"007",
            children:[{
              name:"008",
              children:[{
                name:"009",
                children:[{
                  name:"010",
                  children:[]
                }]
              }
              ]
            }
            ]
          }
          ]
        }
        ]
      }
      ]
    }
    ]
  },
  {
    name:"011",
    children:[{
      name:"012",
      children:[{
        name:"013",
        children:[{
          name:"014",
          children:[{
            name:"015",
            children:[{
              name:"016",
              children:[]}
              ],
            },
            {
              name:"017",
              children:[{
                name:"018",
                children:[{
                  name:"019",
                  children:[{
                    name:"020",
                    children:[]
                  }]
                }
                ]
              }
              ]
            }
            ]
          }
          ]
        }
        ]
      }
      ]
    }
    ]
    export default class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          jsonTree: TEST_JSON,
          targetNode:"",
          newTree:[],
        }
        this.createTree = this.createTree.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findNode = this.findNode.bind(this);
        this.handleChangeSend = this.handleChangeSend.bind(this);
      }
      createTree (node) {
        return node.map (p => {
          return (
            <ul>
              {p.children.length > 0 
                ? <input type="checkbox"/>
                : null}
              {p.children.length > 0 
                ? p.name
                : null}
              {p.children.length > 0 
                ? this.createTree(p.children)
                : <li key={p.name}><i className="fa fa-table"></i>{p.name}</li>}
            </ul>
          )
        })

      }
        handleChange (e) {
          this.setState({
            targetNode:e.target.value,
          });
        }

        handleChangeSend (e) {
          this.setState({
            jsonTree:TEST_JSON,
          });
          this.state.targetNode && this.findNode(TEST_JSON)
        }

        findNode (node) {
          const { targetNode } = this.state;
          try {
             node.map(p => {
              p.name.includes(targetNode) 
              ? this.state.newTree.push({
                name:p.name,
                children:this.findNode(p.children) || p.children
              })
              : this.findNode(p.children);
            })
            this.setState({
              jsonTree:this.state.newTree,
              newTree:[]
            })
          }
          catch (error) {
          }
        }

        render() {
          const {jsonTree} = this.state
          return <div className="App"> 
          <input type="text" onChange={this.handleChange}/>
          {<button onClick={this.handleChangeSend}><i className="fa fa-search"></i>検索</button>}
          {this.createTree(jsonTree)} 
          </div>
        }
      }
