const BlockList = ({ blocks, loading }) => {
    if (loading) return <div>Lade Blockierungen...</div>;
  
    return (
      <div className="block-list">
        <h2>Deine Zeitblockierungen ({blocks.length})</h2>
        
        {blocks.length === 0 ? (
          <p>Keine aktiven Blockierungen</p>
        ) : (
          blocks.map(block => (
            <div key={block._id} className="block-card">
              <p>
                {new Date(block.startTime).toLocaleDateString()} - 
                {new Date(block.endTime).toLocaleDateString()}
              </p>
              <p>Grund: {block.reason || 'Kein Grund angegeben'}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default BlockList;