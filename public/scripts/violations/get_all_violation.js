let table_body = document.getElementById('table-body')

let response = await fetch('/api/violations')

if(response.status === 200){
    let violations = await response.json()

    for(let violation of violations){
        let row = document.createElement('tr')
        let controls_cell = document.createElement('td')
    }
}


/*
                                      <tr>
                                            <td><%= violation.print_paper %></td>
                                            <td class="controls">
                                                <a href="/violations/<%= violation._id %>/update" class="btn btn-primary btn-sm me-1">
                                                    <i class="fa fa-edit"></i>
                                                </a>
                                                <a href="#" data-toggle="modal" data-target="#deleteConfirmationModal<%= violation._id %>" class="btn btn-danger btn-sm ms-4">
                                                    <i class="fa fa-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                            
                                        <div class="modal fade" id="deleteConfirmationModal<%= violation._id %>" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="deleteConfirmationModalLabel">Bekreft sletting</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        Er du sikker på at du vil slette denne brukeren?
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Avbryt</button>
                                                        <button id="confirmDeleteButton" type="button" data-dismiss="modal" class="btn btn-danger" onclick="deleteViolation('<%= violation._id %>')">Slett</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
*/